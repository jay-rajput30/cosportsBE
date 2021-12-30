const express = require("express");
const {
  getAllPosts,
  addPost,
  editPost,
} = require("../controllers/post.controller");
const router = express.Router();

router.get("/", getAllPosts);

router.post("/", addPost);

router.post("/editpost/:id", editPost);

router.post("/deletepost/:id");

module.exports = router;
