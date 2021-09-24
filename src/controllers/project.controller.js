const mysqlConnection = require('../database');

//API - GET ALL
const getProject = async(req, res) => {
    const projects = await mysqlConnection.query('SELECT * FROM project');
    res.json(projects)
};


//API - GET JUST ONE BY ID
const getProjectbyId = async(req, res) => {
    const { id } = req.params;
    const project = await mysqlConnection.query('SELECT * FROM project WHERE id = ?', [id]);
    res.json(project)
};

//GET PROJECT´S LIST
const viewProject = async(req, res) => {
    const projects = await mysqlConnection.query('SELECT project.*, category.name FROM project LEFT join category on project.category = category.id');
    res.render('./projects/view-projects', { projects })
}

//GET PROJECT CREATE FORM
const createProject = async(req, res) => {
    const category = await mysqlConnection.query('SELECT * FROM category');
    res.render('./projects/add-project', { category })
};


//POST PROJECT ENTRY
const postProject = async(req, res) => {
    const { title, description, category, img, link } = req.body;
    const new_post = {
        title,
        description,
        category,
        img,
        link
    };

    await mysqlConnection.query('INSERT INTO project set ?', [new_post]);
    res.redirect('/project/view')
};

//UPDATE PROYECT FORM
const updateProjectbyId = async(req, res) => {
    const { id } = req.params;
    const projects = await mysqlConnection.query('SELECT * FROM project WHERE id = ?', [id]);
    const category = await mysqlConnection.query('SELECT * FROM category');
    res.render('./projects/update-project', { projects, category })
};

//POST UPDATE
const updateProject = async(req, res) => {
    const { id } = req.params;
    const { title, description, category, img, link } = req.body;
    const new_post = {
        title,
        description,
        category,
        img,
        link
    };

    await mysqlConnection.query('UPDATE project set ? WHERE id = ?', [new_post, id]);
    res.redirect('/project/view')
};

//DELETE ENTRY
const deleteProject = async(req, res) => {
    const { id } = req.params;
    await mysqlConnection.query('DELETE FROM project WHERE id = ?', [id]);
    res.redirect('/project/view')
};


module.exports = {
    getProject,
    getProjectbyId,
    createProject,
    postProject,
    updateProjectbyId,
    updateProject,
    deleteProject,
    viewProject
};