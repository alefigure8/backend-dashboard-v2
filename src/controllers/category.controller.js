import mysqlConnection from '../database.js'

// GET categories / private
export const getCategory = async (req, res) => {
  try {
    const category = await mysqlConnection.query('SELECT * FROM category')
    res.json(category)
  } catch (error) {
    res.status(401).send({
      message: `Error from get category: ${error}`
    })
  }
}

// GET ONLY ONE / private
export const getCategorybyId = async (req, res) => {
  const {id} = req.params
  try {
    const category = await mysqlConnection.query(
      'SELECT * FROM category WHERE id = ?',
      [id]
    )
    res.json(category)
  } catch (error) {
    res.status(401).send({
      message: `Error from get category by id: ${error}`
    })
  }
}

// VIEW CATEGORY LIST
export const viewCategory = async (req, res) => {
  try {
    const category = await mysqlConnection.query('SELECT * FROM category')
    res.render('./category/category', {category})
  } catch (error) {
    res.status(401).send({
      message: `Error from view category: ${error}`
    })
  }
}

// POST CREATE / PRIVATE
export const postCategory = async (req, res) => {
  const {name, img} = req.body
  try {
    const newCategory = {
      name,
      img
    }

    await mysqlConnection.query('INSERT INTO category set ?', [newCategory])

    res.redirect('/category/view')
  } catch (error) {
    res.status(401).send({
      message: `Error from post category: ${error}`
    })
  }
}

// GET UPADATE / PRIVATE
export const updateCategorybyId = async (req, res) => {
  const {id} = req.params
  try {
    const category = await mysqlConnection.query(
      'SELECT * FROM category WHERE id = ?',
      [id]
    )
    res.render('./category/update-category', {category})
  } catch (error) {
    res.status(401).send({
      message: `Error from update category by id: ${error}`
    })
  }
}

// POST UPADATE / PRIVATE
export const postCategorybyId = async (req, res) => {
  const {id} = req.params
  const {name, img} = req.body
  const updateCategory = {
    name,
    img
  }

  try {
    await mysqlConnection.query('UPDATE category set ? WHERE ID = ?', [
      updateCategory,
      id
    ])
    res.redirect('/category/view')
  } catch (error) {
    res.status(401).send({
      message: `Error from post category by id: ${error}`
    })
  }
}

// DELETE / PRIVATE
export const deleteCategory = async (req, res) => {
  const {id} = req.params
  try {
    await mysqlConnection.query('DELETE FROM category WHERE id = ?', [id])
    res.redirect('/category/view')
  } catch (error) {
    res.status(401).send({
      message: `Error from delete category: ${error}`
    })
  }
}
