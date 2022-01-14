const express = require("express");
router = express.Router();

const {
  getPostComments,
  getSingleComment,
  getAllComments,
} = require("../controllers/comment.controller");

router.get("/", getAllComments);

router.get("/postcomment", getPostComments);

router.get("/singlecomment", getSingleComment);

module.exports = router;
