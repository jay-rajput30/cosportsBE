const mongoose = require("mongoose");
const { Schema } = mongoose;
const { User } = require("../models/account.model");
const accountSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    bio: {
      type: String,
      default: "Hey there. How you doin?",
    },
  },
  { timestamps: true }
);

const Account = mongoose.model("account", accountSchema);

module.exports = Account;
