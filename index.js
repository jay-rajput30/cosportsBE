const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = 3003;
const { initializeDBConnection } = require("./db/db.connect");
require("dotenv").config();

app.use(cors());
app.use(express.json());

initializeDBConnection();
/**
 * 404 Route Handler
 * Note: DO not MOVE. This should be the last route
 */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "404 api not found.  oops, you hit the wrong api.  please check",
  });
});
app.listen(port, (req, res) => {
  console.log("server started");
});
