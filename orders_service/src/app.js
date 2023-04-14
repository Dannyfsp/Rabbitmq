require("dotenv").config();
const express = require("express");
const receiveFromRabbitMQ = require("./amqp");

require("./config/db");
const orderRouter = require("./routes/orders.route");

const app = express();

app.use(express.json());

receiveFromRabbitMQ("ORDERS");
// connect().then(() => {
//   channel.consume("ORDER", ()
// })

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to my first microservice with rabbitMQ" });
});

app.use("/api", orderRouter);

module.exports = app;
