const mongoose = require("mongoose");
const { Schema } = mongoose;

const { Post } = require("../models/post.model");

const notificationSchema = new Schema(
  {
    username: {
      type: String,
    },
    actionString: {
      type: String,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("notification", notificationSchema);

module.exports = Notification;
