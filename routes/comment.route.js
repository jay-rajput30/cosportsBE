const express = require("express");
router = express.Router();

const {
  getPostComments,
  getSingleComment,
} = require("../controllers/comment.controller");

router.get("/postcomment", getPostComments);

router.get("/singlecomment", getSingleComment);
module.exports = router;
