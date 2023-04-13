const pool = require("../config/db");

exports.productService = {
  getAll: async () => {
    const result = await pool.query("SELECT * FROM products");
    return result.rows;
  },

  findByPk: async (id) => {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },
};
