import mysqlConnection from '../database.js'; // GET categories / private

export const getCategory = async (req, res) => {
  const category = await mysqlConnection.query('SELECT * FROM category');
  res.json(category);
}; // GET ONLY ONE / private

export const getCategorybyId = async (req, res) => {
  const {
    id
  } = req.params;
  const category = await mysqlConnection.query('SELECT * FROM category WHERE id = ?', [id]);
  res.json(category);
}; // VIEW CATEGORY LIST

export const viewCategory = async (req, res) => {
  const category = await mysqlConnection.query('SELECT * FROM category');
  res.render('./category/category', {
    category
  });
}; // POST CREATE / PRIVATE

export const postCategory = async (req, res) => {
  const {
    name,
    img
  } = req.body;
  const newCategory = {
    name,
    img
  };
  await mysqlConnection.query('INSERT INTO category set ?', [newCategory]);
  res.redirect('/category/view');
}; // GET UPADATE / PRIVATE

export const updateCategorybyId = async (req, res) => {
  const {
    id
  } = req.params;
  const category = await mysqlConnection.query('SELECT * FROM category WHERE id = ?', [id]);
  res.render('./category/update-category', {
    category
  });
}; // POST UPADATE / PRIVATE

export const postCategorybyId = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    name,
    img
  } = req.body;
  const updateCategory = {
    name,
    img
  };
  await mysqlConnection.query('UPDATE category set ? WHERE ID = ?', [updateCategory, id]);
  res.redirect('/category/view');
}; // DELETE / PRIVATE

export const deleteCategory = async (req, res) => {
  const {
    id
  } = req.params;
  await mysqlConnection.query('DELETE FROM category WHERE id = ?', [id]);
  res.redirect('/category/view');
};