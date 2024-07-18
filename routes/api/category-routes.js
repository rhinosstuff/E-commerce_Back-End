const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
      order: [['id', 'ASC']]
    });
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err)
  }
});

// GET category by id
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!category) {
      res.status(404).json({ message: 'Category not found.' })
      return;
    }
    res.status(200).json(category)
  } catch (err) {
    res.status(500).json(err)
  }
});

// POST create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body)
    res.status(201).json(newCategory)
  } catch (err) {
    res.status(400).json(err)
  }
});

// PUT update a category by id
router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updateCategory[0]) {
      res.status(404).json({ message: 'Category not found.' })
      return;
    }
    res.status(200).json({ message: 'Category updated successfully!' })
  } catch (err) {
    res.status(400).json(err)
  }
});

// DELETE a category by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id },
    })
    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found.' })
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully!' })
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
