import mysqlConnection from '../database.js'

// API - GET ALL
export const getBlog = async (req, res) => {
  const blogs = await mysqlConnection.query('SELECT * FROM blog')
  res.json(blogs)
}

// API - GET JUST ONE
export const getEntry = async (req, res) => {
  const {id} = req.params
  const blog = await mysqlConnection.query('SELECT * FROM blog WHERE id = ?', [
    id
  ])
  await res.json(blog)
}

// GET BLOG´S LIST
export const blogs = async (req, res) => {
  const blogs = await mysqlConnection.query(
    'SELECT blog.*, category.name FROM blog LEFT join category on blog.category = category.id'
  )
  res.render('./blog/blog', {blogs})
}

// GET CREATE FORM
export const formBlog = async (req, res) => {
  const category = await mysqlConnection.query('SELECT * FROM category')
  const users = await mysqlConnection.query('SELECT * FROM users')
  res.render('./blog/add-blog', {category, users})
}

// POST ENTRY
export const createPost = async (req, res) => {
  const {title, description, field, img, user, category} = req.body
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
  const {id} = req.params
  const {title, description, field, img, user, category} = req.body
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
}

// DELETE ENTRY
export const deleteEntry = async (req, res) => {
  const {id} = req.params
  await mysqlConnection.query('DELETE FROM blog WHERE id = ?', [id])
  res.redirect('/blog/view')
}
