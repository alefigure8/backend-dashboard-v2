"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCategory = exports.postCategorybyId = exports.updateCategorybyId = exports.postCategory = exports.viewCategory = exports.getCategorybyId = exports.getCategory = void 0;

var _database = _interopRequireDefault(require("../database.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// GET categories / private
const getCategory = async (req, res) => {
  const category = await _database.default.query('SELECT * FROM category');
  res.json(category);
}; // GET ONLY ONE / private


exports.getCategory = getCategory;

const getCategorybyId = async (req, res) => {
  const {
    id
  } = req.params;
  const category = await _database.default.query('SELECT * FROM category WHERE id = ?', [id]);
  res.json(category);
}; // VIEW CATEGORY LIST


exports.getCategorybyId = getCategorybyId;

const viewCategory = async (req, res) => {
  const category = await _database.default.query('SELECT * FROM category');
  res.render('./category/category', {
    category
  });
}; // POST CREATE / PRIVATE


exports.viewCategory = viewCategory;

const postCategory = async (req, res) => {
  const {
    name
  } = req.body;
  const img = `/img/${req.file.filename}`;
  const newCategory = {
    name,
    img
  };
  await _database.default.query('INSERT INTO category set ?', [newCategory]);
  res.redirect('/category/view');
}; // GET UPADATE / PRIVATE


exports.postCategory = postCategory;

const updateCategorybyId = async (req, res) => {
  const {
    id
  } = req.params;
  const category = await _database.default.query('SELECT * FROM category WHERE id = ?', [id]);
  res.render('./category/update-category', {
    category
  });
}; // POST UPADATE / PRIVATE


exports.updateCategorybyId = updateCategorybyId;

const postCategorybyId = async (req, res) => {
  const {
    id
  } = req.params;
  const img = `/img/${req.file.filename}`;
  const {
    name
  } = req.body;
  const updateCategory = {
    name,
    img
  };
  await _database.default.query('UPDATE category set ? WHERE ID = ?', [updateCategory, id]);
  res.redirect('/category/view');
}; // DELETE / PRIVATE


exports.postCategorybyId = postCategorybyId;

const deleteCategory = async (req, res) => {
  const {
    id
  } = req.params;
  await _database.default.query('DELETE FROM category WHERE id = ?', [id]);
  res.redirect('/category/view');
};

exports.deleteCategory = deleteCategory;