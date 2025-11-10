// src/snowflake.js
const snowflake = require('snowflake-sdk');
require('dotenv').config();

let connection = null;

// Reuse a single connection
function connectOnce() {
  return new Promise((resolve, reject) => {
    if (connection && connection.isUp()) return resolve(connection);

    connection = snowflake.createConnection({
      account: process.env.SNOWFLAKE_ACCOUNT,
      username: process.env.SNOWFLAKE_USERNAME,
      password: process.env.SNOWFLAKE_PASSWORD,
      warehouse: process.env.SNOWFLAKE_WAREHOUSE,
      database: process.env.SNOWFLAKE_DATABASE,
      schema: process.env.SNOWFLAKE_SCHEMA,
      role: process.env.SNOWFLAKE_ROLE,
    });

    connection.connect((err, conn) => {
      if (err) return reject(new Error('❌ Snowflake connection failed: ' + err.message));
      console.log('✅ Connected to Snowflake successfully!');
      resolve(conn);
    });
  });
}

async function query(sqlText, binds = []) {
  const conn = await connectOnce();
  return new Promise((resolve, reject) => {
    conn.execute({
      sqlText,
      binds,
      complete: (err, stmt, rows) => {
        if (err) return reject(new Error('❌ Query failed: ' + err.message));
        resolve(rows);
      },
    });
  });
}

module.exports = { connectOnce, query };
