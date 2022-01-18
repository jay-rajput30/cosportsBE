const User = require("../models/user.model");
const Account = require("../models/account.model");
const Post = require("../models/post.model");

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
    const { content, type } = req.body;
    const { userId } = req.data;
    const newPost = new Post({
      uid: userId,
      content,
      date: new Date(),
      likes: [],
      type,
    });
    await newPost.save();
    res.status(200).json({ success: true, post: newPost });
  } catch (err) {
    console.log({ err });
    res.status(503).json({ success: false, err });
  }
};

const editPost = async (req, res) => {
  try {
    // const { userId } = req.user;
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
    const foundPost = await Post.findById(postId);
    foundPost.likes.push(userId);
    console.log({ likes: foundPost.likes });
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
