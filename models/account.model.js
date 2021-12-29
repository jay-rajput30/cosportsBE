const mongoose = require("mongoose");
const { Schema } = mongoose;

const accountSchema = Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    bio: {
      type: String,
      required: "the users bio is required",
      default: "Hey there. How you doin?",
    },
  },
  { timestamps: true }
);

const Account = mongoose.model("account", accountSchema);

module.exports = Account;
