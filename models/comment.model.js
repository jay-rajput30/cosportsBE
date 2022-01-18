const mongoose = require("mongoose");
const { Schema } = mongoose;
const { User } = require("../models/account.model");
const { Post } = require("../models/post.model");

const commentSchema = new Schema({
  uid: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "post",
  },
  content: {
    type: String,
    required: "comment content is required",
  },
  date: {
    type: Date,
    required: "comment date is required",
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
