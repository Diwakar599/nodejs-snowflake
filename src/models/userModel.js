const { query } = require('../snowflake');

const User = {
  async findByEmail(email) {
    const sql = `SELECT * FROM USERS WHERE EMAIL = '${email}'`;
    return await query(sql);
  },

  async create(userData) {
    const { name, email, password, phone } = userData;
    const sql = `
      INSERT INTO USERS (NAME, EMAIL, PASSWORD, PHONE, CREATED_AT)
      VALUES ('${name}', '${email}', '${password}', '${phone || ''}', CURRENT_TIMESTAMP());
    `;
    return await query(sql);
  }
};

module.exports = User;
