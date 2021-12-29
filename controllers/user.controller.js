const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Account = require("../models/account.model");

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

        const account = new Account({
          uid: user._id,
          following: [],
          followers: [],
          bio: "how you doin?",
        });

        await account.save();
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

const findSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userFound = await User.findById(id);
    console.log({ userFound });
    res.status(200).json({ success: true, user: userFound });
  } catch (err) {
    console.log({ err });
    res.status(503).json({ success: false, err });
  }
};

const editExistingUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, username } = req.body;
    // console.log({ firstName, lastName, email, username, id });

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      res
        .status(503)
        .json({ success: false, message: "username already exists" });
    } else {
      const userFound = await User.findById(id);
      userFound.firstName = firstName;
      userFound.lastName = lastName;
      userFound.username = username;

      await userFound.save();

      res.status(200).json({ success: true, user: userFound });
    }
  } catch (err) {
    console.log({ err });
    res.status(503).json({ success: false, err });
  }
};

// {
//     firstName:"Jay",
//     lastName:"Rajput",
//     email:"jayrajput@gmail.com",
//     password: "jayrajput",
//     username:"jayrajput30"
// }

module.exports = { addUser, findSingleUser, editExistingUser };
