const express = require("express");
const {
  getAllPosts,
  addPost,
  editPost,
} = require("../controllers/post.controller");
const authenticateRoute = require("../middlewares/route.auth");
const router = express.Router();

router.get("/", authenticateRoute, getAllPosts);

router.post("/", authenticateRoute, addPost);

router.post("/editpost", authenticateRoute, editPost);

// router.post("/deletepost/:id");

module.exports = router;
