const express = require('express');
const router = express.Router();

// "/categories"
router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

router.get('/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  res.json([
    {
      categoryId,
      category: 'Food',
      products: [],
    },
  ]);
});

router.get('/', (req, res) => {
  const { categoryId } = req.params;
  res.json([
    {
      categoryId,
      category: 'Food',
      products: [],
    },
    {
      categoryId,
      category: 'Games',
      products: [],
    },
    {
      categoryId,
      category: 'clothes',
      products: [],
    },
  ]);
});

module.exports = router;
