const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = 3003;
const { initializeDBConnection } = require("./db/db.connect");
const user = require("./routes/user.route");
const account = require("./routes/account.route");
const post = require("./routes/post.route");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/user", user);
app.use("/account", account);
app.use("/post", post);
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
