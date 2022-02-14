const express = require("express");
router = express.Router();

const {
  getPostComments,
  getSingleComment,
  addComment,
  getAllComments,
  likedComment,
} = require("../controllers/comment.controller");
const authenticateRoute = require("../middlewares/route.auth");

router.get("/", authenticateRoute, getAllComments);

router.get("/postcomments", authenticateRoute, getPostComments);

router.post("/addcomment", authenticateRoute, addComment);

router.post("/likecomment", authenticateRoute, likedComment);

router.get("/singlecomment", authenticateRoute, getSingleComment);

module.exports = router;
