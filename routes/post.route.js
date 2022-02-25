const express = require("express");
const {
  getAllPosts,
  addPost,
  editPost,
  likedPost,
  unlikedPost,
} = require("../controllers/post.controller");
const authenticateRoute = require("../middlewares/route.auth");
const router = express.Router();

router.get("/", authenticateRoute, getAllPosts);

router.post("/", authenticateRoute, addPost);

router.post("/editpost", authenticateRoute, editPost);

router.post("/likepost", authenticateRoute, likedPost);

router.post("/unlikepost", authenticateRoute, unlikedPost);

module.exports = router;
