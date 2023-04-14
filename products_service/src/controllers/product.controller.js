const { productService } = require("../services/product.service");
const { authService } = require("../services/auth.service");
const axios = require("axios");

const sendToRabbitMQ = require("../amqp");

exports.products = async (req, res) => {
  try {
    const results = await productService.getAll();
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.product = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productService.findByPk(id);
    if (!product) return res.status(400).json({ message: "Product not found" });

    return res.status(400).json(product);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.order = async (req, res) => {
  const { id } = req.params;
  const { product_id, quantity } = req.body;
  try {
    const user = await authService.findByPk(id);
    if (!user) return res.status(400).json({ message: "user does not exist" });

    const product = await productService.findByPk(product_id);
    if (!product) return res.status(400).json({ message: "Product not found" });

    const total = product.price * quantity;
    const payload = {
      product_id: product.id,
      quantity: quantity,
      amount: total,
    };

    await sendToRabbitMQ("ORDERS", payload);

    return res.status(400).json({ message: "Order initiated successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.orders = async (req, res) => {
  try {
    const url = process.env.ORDERS_URL;
    const response = await axios.get(url);
    const allOrders = response.data;
    console.log(allOrders);
    return res.status(200).json(allOrders);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
