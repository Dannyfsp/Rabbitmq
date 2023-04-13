const pool = require("../config/db");

exports.authService = {
  findByPK: async (id) => {
    const result = await pool.query("SELECT * FROM customers WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },

  findByEmail: async (email) => {
    const result = await pool.query(
      "SELECT * FROM customers WHERE email = $1",
      [email]
    );
    return result.rows[0];
  },

  addCustomers: async (email, password) => {
    const result = await pool.query(
      "INSERT INTO customers (email, password) VALUES ($1, $2) RETURNING *",
      [email, password]
    );
    return result.rows[0];
  },
};
