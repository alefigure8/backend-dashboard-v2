"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteProject = exports.updateProject = exports.updateProjectbyId = exports.postProject = exports.createProject = exports.viewProject = exports.getProjectbyId = exports.getProject = void 0;

var _database = _interopRequireDefault(require("../database.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// API - GET ALL
const getProject = async (req, res) => {
  const projects = await _database.default.query('SELECT * FROM project');
  res.json(projects);
}; // API - GET JUST ONE BY ID


exports.getProject = getProject;

const getProjectbyId = async (req, res) => {
  const {
    id
  } = req.params;
  const project = await _database.default.query('SELECT * FROM project WHERE id = ?', [id]);
  res.json(project);
}; // GET PROJECT´S LIST


exports.getProjectbyId = getProjectbyId;

const viewProject = async (req, res) => {
  const projects = await _database.default.query('SELECT project.*, category.name FROM project LEFT join category on project.category = category.id');
  res.render('./projects/view-projects', {
    projects
  });
}; // GET PROJECT CREATE FORM


exports.viewProject = viewProject;

const createProject = async (req, res) => {
  const category = await _database.default.query('SELECT * FROM category');
  res.render('./projects/add-project', {
    category
  });
}; // POST PROJECT ENTRY


exports.createProject = createProject;

const postProject = async (req, res) => {
  const img = `/img/${req.file.filename}`;
  const {
    title,
    description,
    category,
    link
  } = req.body;
  const newPost = {
    title,
    description,
    img,
    category,
    img,
    link
  };
  await _database.default.query('INSERT INTO project set ?', [newPost]);
  res.redirect('/project/view');
}; // UPDATE PROYECT FORM


exports.postProject = postProject;

const updateProjectbyId = async (req, res) => {
  const {
    id
  } = req.params;
  const projects = await _database.default.query('SELECT * FROM project WHERE id = ?', [id]);
  const category = await _database.default.query('SELECT * FROM category');
  res.render('./projects/update-project', {
    projects,
    category
  });
}; // POST UPDATE


exports.updateProjectbyId = updateProjectbyId;

const updateProject = async (req, res) => {
  const img = `/img/${req.file.filename}`;
  const {
    id
  } = req.params;
  const {
    title,
    description,
    category,
    link
  } = req.body;
  const newPost = {
    title,
    description,
    category,
    img,
    link
  };
  await _database.default.query('UPDATE project set ? WHERE id = ?', [newPost, id]);
  res.redirect('/project/view');
}; // DELETE ENTRY


exports.updateProject = updateProject;

const deleteProject = async (req, res) => {
  const {
    id
  } = req.params;
  await _database.default.query('DELETE FROM project WHERE id = ?', [id]);
  res.redirect('/project/view');
};

exports.deleteProject = deleteProject;