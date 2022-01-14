const User = require("../models/user.model");
const Account = require("../models/account.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const getAllComments = async (req, res) => {
  try {
    const allComments = await Comment.find({}).populate("uid");
    res.status(200).json({ success: true, comments: allComments });
  } catch {
    console.log({ error: e });
    res.status(503).json({ success: false, error: e });
  }
};

const getPostComments = async (req, res) => {
  try {
    const { postId } = req.body;
    const { userId } = req.data;

    const commentsFound = await Comment.find({ postId });

    res.status(200).json({ success: true, comments: commentsFound });
  } catch {
    console.log({ error: e });
    res.status(503).json({ success: false, error: e });
  }
};

const addComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const { userId } = req.data;
    const newComment = new Comment({
      uid: userId,
      postId,
      content,
      date: new Date(),
      likes: 0,
    });
    await newComment.save();
    res.status(200).json({ success: true, comment: newComment });
  } catch (e) {
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

module.exports = {
  getAllComments,
  getPostComments,
  addComment,
  getSingleComment,
};
