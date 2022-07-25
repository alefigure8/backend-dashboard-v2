import mysqlConnection from '../database.js'

// API - GET ALL
export const getProject = async (req, res) => {
  try {
    const projects = await mysqlConnection.query('SELECT * FROM project')
    res.json(projects)
  } catch (error) {
    res.status(401).send({
      message: `Error from get project: ${error}`
    })
  }
}

// API - GET JUST ONE BY ID
export const getProjectbyId = async (req, res) => {
  const {id} = req.params
  try {
    const project = await mysqlConnection.query(
      'SELECT * FROM project WHERE id = ?',
      [id]
    )
    res.json(project)
  } catch (error) {
    res.status(401).send({
      message: `Error from get project by id: ${error}`
    })
  }
}

// GET PROJECT´S LIST
export const viewProject = async (req, res) => {
  try {
    const projects = await mysqlConnection.query(
      'SELECT project.*, category.name FROM project LEFT join category on project.category = category.id'
    )
    res.render('./projects/view-projects', {projects})
  } catch (error) {
    res.status(401).send({
      message: `Error from view project: ${error}`
    })
  }
}

// GET PROJECT CREATE FORM
export const createProject = async (req, res) => {
  try {
    const category = await mysqlConnection.query('SELECT * FROM category')
    res.render('./projects/add-project', {category})
  } catch (error) {
    res.status(401).send({
      message: `Error from create project: ${error}`
    })
  }
}

// POST PROJECT ENTRY
export const postProject = async (req, res) => {
  try {
    const {title, description, category, link, img} = req.body
    const newPost = {
      title,
      description,
      category,
      link,
      img
    }

    await mysqlConnection.query('INSERT INTO project set ?', [newPost])
    res.redirect('/project/view')
  } catch (error) {
    res.status(401).send({
      message: `Error from post project: ${error}`
    })
  }
}

// UPDATE PROYECT FORM
export const updateProjectbyId = async (req, res) => {
  const {id} = req.params
  try {
    const projects = await mysqlConnection.query(
      'SELECT * FROM project WHERE id = ?',
      [id]
    )
    const category = await mysqlConnection.query('SELECT * FROM category')
    res.render('./projects/update-project', {projects, category})
  } catch (error) {
    res.status(401).send({
      message: `Error from update project by id: ${error}`
    })
  }
}

// POST UPDATE
export const updateProject = async (req, res) => {
  try {
    const {id} = req.params
    const {title, description, category, link, img} = req.body
    console.log(req.body);
    const newPost = {
      title,
      description,
      category,
      link,
      img
    }

    await mysqlConnection.query('UPDATE project set ? WHERE id = ?', [
      newPost,
      id
    ])
    res.redirect('/project/view')
  } catch (error) {
    res.status(401).send({
      message: `Error from update project: ${error}`
    })
  }
}

// DELETE ENTRY
export const deleteProject = async (req, res) => {
  const {id} = req.params
  try {
    await mysqlConnection.query('DELETE FROM project WHERE id = ?', [id])
    res.redirect('/project/view')
  } catch (error) {
    res.status(401).send({
      message: `Error from delete project: ${error}`
    })
  }
}
