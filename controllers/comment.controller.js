const User = require("../models/user.model");
const Account = require("../models/account.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const getPostComments = async (req, res) => {
  try {
    const { postId } = req.body;
    const { userId } = req.data;

    const commentsFound = await Comment.find({ postId });
    // console.log({ postFound });
    res.status(200).json({ success: true, comments: commentsFound });
  } catch {
    console.log({ error: e });
    res.status(503).json({ success: false, error: e });
  }
};

const getSingleComment = async (req, res) => {
  const { postId } = req.body;
  const { userId } = req.data;
  const commentFound = await Comment.find({ postId, userId });
  try {
  } catch (e) {
    console.log({ error: e });
    res.status(503).json({ success: false, error: e });
  }
};

module.exports = { getPostComments, getSingleComment };
