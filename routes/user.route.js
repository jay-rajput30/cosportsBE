const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const {
  addUser,
  findSingleUser,
  editExistingUser,
  getSingleUser,
  getAllUsers,
} = require("../controllers/user.controller");
const loginVerify = require("../middlewares/login.auth");
const authenticateRoute = require("../middlewares/route.auth");

router.post("/", addUser);

router.get("/", authenticateRoute, getAllUsers);

router.post("/singleuser", loginVerify, findSingleUser);

router.get("/singleuser", authenticateRoute, getSingleUser);

router.post("/edituser", authenticateRoute, editExistingUser);

module.exports = router;
