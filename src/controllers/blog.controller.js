import mysqlConnection from '../database.js'

// API - GET ALL
export const getBlog = async (req, res) => {
  try {
    const blogs = await mysqlConnection.query('SELECT * FROM blog')
    const {limit, category} = req.query
    let limitBlog = [...blogs]

    // Limit number of blogs
    if (limit) {
      limitBlog = limitBlog.slice(0, Number(limit))
    }

    // Search category of blog
    if (category) {
      limitBlog = limitBlog.filter(cat => cat.category === Number(category))
    }

    res.json({succes: true, data: limitBlog})
  } catch (error) {
    res.status(401).send({
      message: `Error from get blog: ${error}`
    })
  }
}

// API - GET JUST ONE
export const getEntry = async (req, res) => {
  const {id} = req.params
  try {
    const blog = await mysqlConnection.query(
      'SELECT * FROM blog WHERE id = ?',
      [id]
    )
    await res.json({succes: true, data: blog})
  } catch (error) {
    res.status(401).send({
      message: `Error from get entry: ${error}`
    })
  }
}

// GET BLOG´S LIST
export const blogs = async (req, res) => {
  try {
    const blogs = await mysqlConnection.query(
      'SELECT blog.*, category.name FROM blog LEFT join category on blog.category = category.id'
    )
    res.render('./blog/blog', {blogs})
  } catch (error) {
    res.status(401).send({
      message: `Error from blog: ${error}`
    })
  }
}

// GET CREATE FORM
export const formBlog = async (req, res) => {
  try {
    const category = await mysqlConnection.query('SELECT * FROM category')
    const users = await mysqlConnection.query('SELECT * FROM users')
    res.render('./blog/add-blog', {category, users})
  } catch (error) {
    res.status(401).send({
      message: `Error from form blog: ${error}`
    })
  }
}

// POST ENTRY
export const createPost = async (req, res) => {
  try {
    const {title, description, field, user, category} = req.body
    let newPost = {}

    if (!req.file) {
      newPost = {
        title,
        description,
        field,
        user,
        category
      }
    } else {
      newPost = {
        title,
        description,
        field,
        user,
        category,
        img: `/img/${req.file.filename}`
      }
    }

    await mysqlConnection.query('INSERT INTO blog set ?', [newPost])
    res.redirect('/blog/view')
  } catch (error) {
    res.status(401).send({
      message: `Error from create blog: ${error}`
    })
  }
}

// UPDATE BLOG FORM
export const formUpdate = async (req, res) => {
  const {id} = req.params
  try {
    const blogs = await mysqlConnection.query(
      'SELECT * FROM blog WHERE id = ?',
      [id]
    )
    const users = await mysqlConnection.query('SELECT * FROM users')
    const category = await mysqlConnection.query('SELECT * FROM category')
    res.render('./blog/update-blog', {blogs, users, category})
  } catch (error) {
    res.status(401).send({
      message: `Error from form update: ${error}`
    })
  }
}

// POST UPDATE
export const postUpdate = async (req, res) => {
  try {
    const {id} = req.params
    const {title, description, field, user, category} = req.body
    let newPost = {}

    if (!req?.file?.filename) {
      newPost = {
        title,
        description,
        field,
        user,
        category
      }
    } else {
      newPost = {
        title,
        description,
        field,
        user,
        category,
        img: `/img/${req.file.filename}`
      }
    }
    await mysqlConnection.query('UPDATE blog set ? WHERE id = ?', [newPost, id])
    res.redirect('/blog/view')
  } catch (error) {
    res.status(401).send({
      message: `Error from update post: ${error}`
    })
  }
}

// DELETE ENTRY
export const deleteEntry = async (req, res) => {
  const {id} = req.params
  try {
    await mysqlConnection.query('DELETE FROM blog WHERE id = ?', [id])
    res.redirect('/blog/view')
  } catch (error) {
    res.status(401).send({
      message: `Error from delete entry: ${error}`
    })
  }
}

// DELETE IMG
export const deleteImg = async (req, res) => {
  const {id} = req.params
  await mysqlConnection.query('DELETE FROM blog WHERE img = ?', [id])
  res.render(`/blog/update/${id}`)
}
