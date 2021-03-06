const User = require("../models/user.model");
const Account = require("../models/account.model");
const Post = require("../models/post.model");
const Notification = require("../models/notification.model");

const getAllPosts = async (req, res) => {
  try {
    const allPost = await Post.find({}).populate("uid");
    res.status(200).json({ success: true, posts: allPost });
  } catch (err) {
    console.log({ error: err });
    res.status(503).json({ success: false, err });
  }
};

const addPost = async (req, res) => {
  try {
    const { content } = req.body;
    const { userId } = req.data;
    const userDetails = await User.findById(userId);
    const newPost = new Post({
      uid: userId,
      content,
      date: new Date(),
      likes: [],
    });

    await newPost.save();
    const updatedPost = { ...newPost._doc, uid: userDetails };
    console.log({ updatedPost });
    const addNotification = new Notification({
      username: `${userDetails.firstName} ${userDetails.lastName}`,
      actionString: " added a post",
      postId: newPost._doc._id,
    });
    await addNotification.save();
    res.status(200).json({ success: true, post: updatedPost });
  } catch (err) {
    console.log({ err });
    res.status(503).json({ success: false, err });
  }
};

const editPost = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const existingPost = await Post.findById(postId);

    existingPost.content = content;
    await existingPost.save();
    res.status(200).json({ success: true, post: existingPost });
  } catch (e) {
    console.log({ error: e });
    res.status(503).json({ success: false, err });
  }
};

const likedPost = async (req, res) => {
  try {
    const { postId } = req.body;
    const { userId } = req.data;
    const userDetails = await User.findById(userId);

    const foundPost = await Post.findById(postId).populate("uid");
    const alreadyLiked = foundPost.likes.find(
      (item) => item.toString() === userId.toString()
    );
    console.log({ alreadyLiked, likes: foundPost.likes });
    if (alreadyLiked == undefined) {
      foundPost.likes.push(userId);

      const addNotification = new Notification({
        username: `${userDetails.firstName} ${userDetails.lastName}`,
        actionString: " liked a post",
        postId,
      });
      await addNotification.save();
    } else {
      foundPost.likes = foundPost.likes.filter(
        (item) => item.toString() !== userId.toString()
      );
    }
    await foundPost.save();
    res.status(200).json({ success: true, post: foundPost });
  } catch (e) {
    console.log({ success: false, error: e });
  }
};

const unlikedPost = async (req, res) => {
  try {
    const { postId } = req.body;
    const { userId } = req.data;
    const foundPost = await Post.findById(postId);
    foundPost.likes = foundPost.likes.filter(
      (item) => item.toString() !== userId.toString()
    );
    await foundPost.save();
    res.status(200).json({ success: true, post: foundPost });
  } catch (e) {
    console.log({ success: false, error: e });
  }
};
//*******************TODO: need to implement the delete post feature********************

// const deletePost = async (req, res) => {
//   try {
//       const {id} = req.params;
//       const allPosts =  await Post.find({});
//       allPosts = allPost.filter()
//   } catch (e) {
//     console.log({ error: e });
//     res.status(503).json({ success: false, err });
//   }
// };

module.exports = { getAllPosts, addPost, editPost, likedPost, unlikedPost };
