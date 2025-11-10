// src/controllers/productController.js
const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
  try {
    const { name, brand, category, price, stock, description, image } = req.body;

    if (!name || !brand || !price) {
      return res.status(400).json({ message: 'Required: name, brand, price.' });
    }

    await Product.create({ name, brand, category, price, stock, description, image });

    return res.status(200).json({ message: 'Product created successfully!' });
  } catch (err) {
    console.error('Create product error:', err);
    return res.status(500).json({ message: 'Database error', error: err.message });
  }
};

exports.getProductsPage = async (req, res) => {
  try {
    const result = await Product.getAllProducts();

    // unwrap: result[0].GET_ALL_PRODUCTS
    let products = [];
    if (Array.isArray(result) && result[0] && result[0].GET_ALL_PRODUCTS) {
      products = result[0].GET_ALL_PRODUCTS;
    }

    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      // send only the clean array
      return res.json(products);
    }

    res.render('products', { products });
  } catch (err) {
    console.error('❌ Controller error:', err);
    res.status(500).json({ message: 'Error fetching products' });
  }
};


