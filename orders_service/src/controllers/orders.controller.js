const pool = require("../config/db");

exports.getAllOrders = async (req, res) => {
  try {
    const results = await pool.query("SELECT * from orders");
    console.log(results[0]);
    return res.status(200).json(results[0]);
  } catch (error) {
    console.log(error);
  }
};
