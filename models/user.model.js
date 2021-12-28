const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: " first name is required",
    },
    lastName: {
      type: String,
      required: " last name is required",
    },
    email: {
      type: String,
      required: "email is required",
    },
    username: {
      type: String,
      required: "username is required",
    },
    password: {
      type: String,
      required: "password is required",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
