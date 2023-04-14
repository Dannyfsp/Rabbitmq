const { Router } = require("express");

const { getAllOrders } = require("../controllers/orders.controller");

const router = Router();

router.get("/orders", getAllOrders);

module.exports = router;
