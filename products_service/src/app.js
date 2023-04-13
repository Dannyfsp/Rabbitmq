require("dotenv").config();
const express = require("express");
require("./config/db");
const customerRouter = require("./routes/auth.route");

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to my first microservice with rabbitMQ" });
});

app.use("/api", customerRouter);

module.exports = app;
