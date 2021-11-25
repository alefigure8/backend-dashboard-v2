"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteImg = exports.deleteEntry = exports.postUpdate = exports.formUpdate = exports.createPost = exports.formBlog = exports.blogs = exports.getEntry = exports.getBlog = void 0;

var _database = _interopRequireDefault(require("../database.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// API - GET ALL
const getBlog = async (req, res) => {
  const blogs = await _database.default.query('SELECT * FROM blog');
  const {
    limit,
    category
  } = req.query;
  let limitBlog = [...blogs]; // Limit number of blogs

  if (limit) {
    limitBlog = limitBlog.slice(0, Number(limit));
  } // Search category of blog


  if (category) {
    s;
    limitBlog = limitBlog.filter(cat => cat.category === Number(category));
  }

  res.json({
    succes: true,
    data: limitBlog
  });
}; // API - GET JUST ONE


exports.getBlog = getBlog;

const getEntry = async (req, res) => {
  const {
    id
  } = req.params;
  const blog = await _database.default.query('SELECT * FROM blog WHERE id = ?', [id]);
  await res.json({
    succes: true,
    data: blog
  });
}; // GET BLOG´S LIST


exports.getEntry = getEntry;

const blogs = async (req, res) => {
  const blogs = await _database.default.query('SELECT blog.*, category.name FROM blog LEFT join category on blog.category = category.id');
  res.render('./blog/blog', {
    blogs
  });
}; // GET CREATE FORM


exports.blogs = blogs;

const formBlog = async (req, res) => {
  const category = await _database.default.query('SELECT * FROM category');
  const users = await _database.default.query('SELECT * FROM users');
  res.render('./blog/add-blog', {
    category,
    users
  });
}; // POST ENTRY


exports.formBlog = formBlog;

const createPost = async (req, res) => {
  try {
    const img = `/img/${req.file.filename}`;
    const {
      title,
      description,
      field,
      user,
      category
    } = req.body;
    const newPost = {
      title,
      description,
      field,
      img,
      user,
      category
    };
    await _database.default.query('INSERT INTO blog set ?', [newPost]);
    res.redirect('/blog/view');
  } catch (error) {
    res.status(401).send({
      message: `Error: ${error}`
    });
  }
}; // UPDATE BLOG FORM


exports.createPost = createPost;

const formUpdate = async (req, res) => {
  const {
    id
  } = req.params;
  const blogs = await _database.default.query('SELECT * FROM blog WHERE id = ?', [id]);
  const users = await _database.default.query('SELECT * FROM users');
  const category = await _database.default.query('SELECT * FROM category');
  res.render('./blog/update-blog', {
    blogs,
    users,
    category
  });
}; // POST UPDATE


exports.formUpdate = formUpdate;

const postUpdate = async (req, res) => {
  try {
    const img = `/img/${req.file.filename}`;
    const {
      id
    } = req.params;
    const {
      title,
      description,
      field,
      user,
      category
    } = req.body;
    const newPost = {
      title,
      description,
      field,
      img,
      user,
      category
    };
    await _database.default.query('UPDATE blog set ? WHERE id = ?', [newPost, id]);
    res.redirect('/blog/view');
  } catch (error) {
    res.status(401).send({
      message: `Error: ${error}`
    });
  }
}; // DELETE ENTRY


exports.postUpdate = postUpdate;

const deleteEntry = async (req, res) => {
  const {
    id
  } = req.params;
  await _database.default.query('DELETE FROM blog WHERE id = ?', [id]);
  res.redirect('/blog/view');
}; // DELETE IMG


exports.deleteEntry = deleteEntry;

const deleteImg = async (req, res) => {
  const {
    img
  } = req.params;
  console.log(img);
  await _database.default.query('DELETE FROM blog WHERE img = ?', [img]);
  res.render(`/blog/update/${id}`);
};

exports.deleteImg = deleteImg;