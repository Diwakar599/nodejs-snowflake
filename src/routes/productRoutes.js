// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route-based save (no /api)
router.post('/add-product', productController.createProduct);

router.get('/getproducts', productController.getProductsPage);

module.exports = router;
