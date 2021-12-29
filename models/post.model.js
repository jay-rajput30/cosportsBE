const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      maxlength: 300,
      required: "the content of the post is required",
    },
    date: {
      type: Date,
      required: "date is required",
    },
    likes: {
      type: Number,
      required: "like count is required",
      default: 0,
    },
    type: {
      type: String,
      required: " a type value is required",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
