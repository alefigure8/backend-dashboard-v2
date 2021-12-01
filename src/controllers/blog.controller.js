import mysqlConnection from '../database.js'
import client  from '../libs/redis.js'

// API - GET ALL
export const getBlog = async (req, res) => {
  const {limit, category} = req.query
  let result = await client.get('blogs')

  if(result && !limit && !category){
    res.json({succes: true, data: JSON.parse(result)})

  } else {
    const blogs = await mysqlConnection.query('SELECT * FROM blog')
    let limitBlog = [...blogs]
    
    // Limit number of blogs
    if(limit){ 
      limitBlog = limitBlog.slice(0, Number(limit))
    }

    // Search category of blog
    if(category){
      limitBlog = limitBlog.filter(cat => cat.category === Number(category))
    }

    await client.set('blogs', JSON.stringify(blogs), {EX: 60*60*24})
    res.json({success: true, data: limitBlog})
  }
}

// API - GET JUST ONE
export const getEntry = async (req, res) => {
  const {id} = req.params
  const blog = await mysqlConnection.query('SELECT * FROM blog WHERE id = ?', [
    id
  ])
  await res.json({succes: true, data: blog})
}

// GET BLOG´S LIST
export const blogs = async (req, res) => {
  let blog = await client.get('blog')
  if(blog){
    blog = JSON.parse(blog)
    res.render('./blog/blog', {blog})
  } else {
    const blog = await mysqlConnection.query(
      'SELECT blog.*, category.name FROM blog LEFT join category on blog.category = category.id'
    )
    await client.set('blog', JSON.stringify(blog), {EX: 60*60*24})
    res.render('./blog/blog', {blog})
  }

}

// GET CREATE FORM
export const formBlog = async (req, res) => {
  const category = await mysqlConnection.query('SELECT * FROM category')
  const users = await mysqlConnection.query('SELECT * FROM users')
  res.render('./blog/add-blog', {category, users})
}

// POST ENTRY
export const createPost = async (req, res) => {
  try {
    const img = `/img/${req.file.filename}`
    const {title, description, field, user, category} = req.body
    const newPost = {
      title,
      description,
      field,
      img,
      user,
      category
    }

    await mysqlConnection.query('INSERT INTO blog set ?', [newPost])
    res.redirect('/blog/view')
  } catch (error) {
    res.status(401).send({
      message: `Error: ${error}`
    })
  }
}

// UPDATE BLOG FORM
export const formUpdate = async (req, res) => {
  const {id} = req.params
  const blogs = await mysqlConnection.query('SELECT * FROM blog WHERE id = ?', [
    id
  ])
  const users = await mysqlConnection.query('SELECT * FROM users')
  const category = await mysqlConnection.query('SELECT * FROM category')

  res.render('./blog/update-blog', {blogs, users, category})
}

// POST UPDATE
export const postUpdate = async (req, res) => {
  try {
    const img = `/img/${req.file.filename}`
    const {id} = req.params
    const {title, description, field, user, category} = req.body
    const newPost = {
      title,
      description,
      field,
      img,
      user,
      category
    }
      await mysqlConnection.query('UPDATE blog set ? WHERE id = ?', [newPost, id])
      res.redirect('/blog/view')
  } catch (error) {
    res.status(401).send({
      message: `Error: ${error}`
  })
  }
}

// DELETE ENTRY
export const deleteEntry = async (req, res) => {
  const {id} = req.params
  await mysqlConnection.query('DELETE FROM blog WHERE id = ?', [id])
  res.redirect('/blog/view')
}

// DELETE IMG TODO
export const deleteImg = async (req, res) => {
  const {img} = req.params
  console.log(img)
  await mysqlConnection.query('DELETE FROM blog WHERE img = ?', [img])
  res.render(`/blog/update/${id}`)
}