const User = require("../models/user.model");
const Account = require("../models/account.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const Notification = require("../models/notification.model");

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
    const userDetails = await User.findById(userId);
    const newComment = new Comment({
      uid: userId,
      postId,
      content,
      date: new Date(),
      likes: [],
    });
    const updatedComment = { ...newComment._doc, uid: userDetails };
    await newComment.save();

    const addNotification = new Notification({
      username: `${userDetails.firstName} ${userDetails.lastName}`,
      actionString: " commented on a post",
      postId,
    });

    await addNotification.save();

    res.status(200).json({ success: true, comment: updatedComment });
  } catch (e) {
    console.log({ error: e });
    res.status(503).json({ success: false, error: e });
  }
};

const getSingleComment = async (req, res) => {
  try {
    const { postId } = req.body;
    const { userId } = req.data;
    const commentFound = await Comment.find({ postId, userId });
  } catch (e) {
    console.log({ error: e });
    res.status(503).json({ success: false, error: e });
  }
};

const likedComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    const { userId } = req.data;
    const userDetails = await User.findById(userId);
    const foundComment = await Comment.findById(commentId).populate("uid");
    const alreadyLiked = foundComment.likes.find(
      (item) => item.toString() === userId.toString()
    );
    console.log({ alreadyLiked, likes: foundComment.likes });
    if (alreadyLiked == undefined) {
      foundComment.likes.push(userId);
    } else {
      foundComment.likes = foundComment.likes.filter(
        (item) => item.toString() !== userId.toString()
      );
    }
    await foundComment.save();

    if (alreadyLiked == undefined) {
      const addNotification = new Notification({
        username: `${userDetails.firstName} ${userDetails.lastName}`,
        actionString: " liked a post",
        postId: foundComment.postId,
      });
      await addNotification.save();
    } else {
    }

    res.status(200).json({ success: true, comment: foundComment });
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
  likedComment,
};
