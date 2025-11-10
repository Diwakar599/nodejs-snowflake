// src/models/productModel.js
const { connectOnce } = require('../snowflake');

const Product = {
  // ✅ Fetch all products using stored procedure
  getAllProducts: async () => {
    try {
      const connection = await connectOnce();

      return new Promise((resolve, reject) => {
        connection.execute({
          sqlText: 'CALL GET_ALL_PRODUCTS();',
          complete: (err, stmt, rows) => {
            if (err) {
              console.error('❌ Stored procedure error:', err);
              reject(err);
            } else {
              console.log('✅ Procedure executed successfully.');
              resolve(rows);
            }
          },
        });
      });
    } catch (err) {
      console.error('❌ Connection error:', err);
      throw err;
    }
  },



  // Create a new product
  create: async (data) => {
    const connection = await connectOnce();
    const imagePath = data.image ? `/uploads/${data.image}` : null;
    const sql = `
      INSERT INTO products (name, brand, category, price, stock, description, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const binds = [
      data.name,
      data.brand,
      data.category,
      Number(data.price),
      Number(data.stock),
      data.description,
      data.image,
    ];

    return new Promise((resolve, reject) => {
      connection.execute({
        sqlText: sql,
        binds,
        complete: (err) => {
          if (err) {
            console.error('❌ Insert error:', err);
            reject(err);
          } else {
            console.log('✅ Product inserted successfully!');
            resolve();
          }
        },
      });
    });
  },
};

module.exports = Product;
