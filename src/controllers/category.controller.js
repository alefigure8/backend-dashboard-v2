const mysqlConnection = require('../database');

//GET categories / private
const getCategory = async(req, res) => {
    const category = await mysqlConnection.query('SELECT * FROM category');
    res.json(category)
};

//GET ONLY ONE / private
const getCategorybyId = async(req, res) => {
    const { id } = req.params;
    const category = await mysqlConnection.query('SELECT * FROM category WHERE id = ?', [id]);
    res.json(category);
};

//VIEW CATEGORY LIST
const viewCategory = async(req, res) => {
    const category = await mysqlConnection.query('SELECT * FROM category');
    res.render('./category/category', { category })
}

//POST CREATE / PRIVATE
const postCategory = async(req, res) => {
    const { name, img } = req.body;
    const new_category = {
        name,
        img
    };
    await mysqlConnection.query('INSERT INTO category set ?', [new_category]);
    res.redirect('/category/view')
};

//GET UPADATE / PRIVATE
const updateCategorybyId = async(req, res) => {
    const { id } = req.params;
    const category = await mysqlConnection.query('SELECT * FROM category WHERE id = ?', [id]);
    res.render('./category/update-category', { category });
};

//POST UPADATE / PRIVATE
const postCategorybyId = async(req, res) => {
    const { id } = req.params;
    const { name, img } = req.body;
    const update_category = {
        name,
        img
    };
    await mysqlConnection.query('UPDATE category set ? WHERE ID = ?', [update_category, id])

    res.redirect('/category/view')
};

//DELETE / PRIVATE
const deleteCategory = async(req, res) => {
    const { id } = req.params;
    await mysqlConnection.query('DELETE FROM category WHERE id = ?', [id]);
    res.redirect('/category/view')
};

module.exports = {
    getCategory,
    getCategorybyId,
    postCategory,
    updateCategorybyId,
    postCategorybyId,
    deleteCategory,
    viewCategory
}