import mysqlConnection from '../database.js'

// API - GET ALL
export const getProject = async (req, res) => {
  const projects = await mysqlConnection.query('SELECT * FROM project')
  res.json(projects)
}

// API - GET JUST ONE BY ID
export const getProjectbyId = async (req, res) => {
  const {id} = req.params
  const project = await mysqlConnection.query(
    'SELECT * FROM project WHERE id = ?',
    [id]
  )
  res.json(project)
}

// GET PROJECT´S LIST
export const viewProject = async (req, res) => {
  const projects = await mysqlConnection.query(
    'SELECT project.*, category.name FROM project LEFT join category on project.category = category.id'
  )
  res.render('./projects/view-projects', {projects})
}

// GET PROJECT CREATE FORM
export const createProject = async (req, res) => {
  const category = await mysqlConnection.query('SELECT * FROM category')
  res.render('./projects/add-project', {category})
}

// POST PROJECT ENTRY
export const postProject = async (req, res) => {
  const {title, description, category, img, link} = req.body
  const newPost = {
    title,
    description,
    category,
    img,
    link
  }

  await mysqlConnection.query('INSERT INTO project set ?', [newPost])
  res.redirect('/project/view')
}

// UPDATE PROYECT FORM
export const updateProjectbyId = async (req, res) => {
  const {id} = req.params
  const projects = await mysqlConnection.query(
    'SELECT * FROM project WHERE id = ?',
    [id]
  )
  const category = await mysqlConnection.query('SELECT * FROM category')
  res.render('./projects/update-project', {projects, category})
}

// POST UPDATE
export const updateProject = async (req, res) => {
  const {id} = req.params
  const {title, description, category, img, link} = req.body
  const newPost = {
    title,
    description,
    category,
    img,
    link
  }

  await mysqlConnection.query('UPDATE project set ? WHERE id = ?', [
    newPost,
    id
  ])
  res.redirect('/project/view')
}

// DELETE ENTRY
export const deleteProject = async (req, res) => {
  const {id} = req.params
  await mysqlConnection.query('DELETE FROM project WHERE id = ?', [id])
  res.redirect('/project/view')
}
