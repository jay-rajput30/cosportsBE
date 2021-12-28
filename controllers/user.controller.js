const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;
    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const user = new User({
          firstName,
          lastName,
          email,
          username,
          password: hash,
        });
        await user.save();
        res
          .status(200)
          .json({ firstName, lastName, email, username, password: hash });
      });
    });
  } catch (err) {
    console.log({ err });
    res.status(503).json({ success: false, err });
  }
};

module.exports = { addUser };
