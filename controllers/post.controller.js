const User = require("../models/user.model");
const Account = require("../models/account.model");
const Post = require("../models/post.model");

const getAllPosts = async (req, res) => {
  try {
    const allPost = await Post.find({});
    res.status(200).json({ success: true, posts: allPost });
  } catch (err) {
    console.log({ error: err });
    res.status(503).json({ success: false, err });
  }
};

const addPost = async () => (req, res) => {
  try {
    const { uid, content, type } = req.params;
    const newPost = new Post({
      uid,
      content,
      date: new Date(),
      likes: 0,
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
    const { id } = req.params;
    const { content } = req.body;

    const existingPost = await Post.findById(id);
    existingPost.content = content;
    await existingPost.save();
    res.status(200).json({ success: true, post: existingPost });
  } catch (e) {
    console.log({ error: e });
    res.status(503).json({ success: false, err });
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

module.exports = { getAllPosts, addPost, editPost };
