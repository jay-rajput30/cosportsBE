const mongoose = require("mongoose");
const { Schema } = mongoose;
const { User } = require("../models/account.model");
const postSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    content: {
      text: String,
      postImg: String,
    },
    date: {
      type: Date,
      required: "date is required",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    // type: {
    //   type: String,
    //   required: "a type value is required",
    // },
    postImg: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
