const { Router } = require("express");
const { signUp, signIn } = require("../controllers/customer.controller");
const {
  products,
  product,
  order,
  orders,
} = require("../controllers/product.controller");

const router = Router();

router.get("/products", products);
router.get("/product/:id", product);
router.get("/orders", orders);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/order/:id", order);

module.exports = router;
