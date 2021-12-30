const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const {
  addUser,
  findSingleUser,
  editExistingUser,
} = require("../controllers/user.controller");
const loginVerify = require("../middlewares/login.auth");

router.post("/", addUser);

router.get("/singleuser/:id", loginVerify, findSingleUser);

router.post("/edituser/:id", editExistingUser);

module.exports = router;
