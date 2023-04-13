require("dotenv").config();
const express = require("express");

require("./config/db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to my first microservice with rabbitMQ" });
});

module.exports = app;
