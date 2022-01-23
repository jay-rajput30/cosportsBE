const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Account = require("../models/account.model");

const addUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      location,
      website,
      email,
      username,
      password,
    } = req.body;
    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const user = new User({
          firstName,
          lastName,
          location,
          website,
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
        res.status(200).json({
          firstName,
          lastName,
          location,
          website,
          email,
          username,
          password: hash,
        });
      });
    });
  } catch (err) {
    console.log({ err });
    res.status(503).json({ success: false, err });
  }
};

const findSingleUser = async (req, res) => {
  try {
    // const { id } = req.params;
    // const userFound = await User.findById(id);

    const userAccountDetails = await Account.findOne({
      uid: req.userFound._id,
    });
    const updatedUserDetails = {
      ...req.userFound._doc,
      userAccountDetails,
    };

    res
      .status(200)
      .json({ success: true, user: updatedUserDetails, token: req.token });
  } catch (err) {
    console.log({ err });
    res.status(503).json({ success: false, err });
  }
};

const editExistingUser = async (req, res) => {
  try {
    const { userId } = req.data;
    const { firstName, lastName, username, bio, location, website } = req.body;

    // console.log({ data: req.data, header: req.headers });
    ez;
    const existingUsername = await User.findOne({ username });
    const userAccountFound = await Account.findOne({ uid: `${userId}` });
    const userFound = await User.findById(userId);

    // if (existingUsername) {
    // res
    //   .status(503)
    //   .json({ success: false, message: "username already exists" });
    // } else {
    userAccountFound.bio = bio;
    userFound.firstName = firstName;
    userFound.lastName = lastName;
    userFound.username = username;
    userFound.location = location;
    userFound.website = website;

    await userAccountFound.save();
    await userFound.save();
    // }
    console.log({ userAccountFound, userFound });
    res.status(200).json({ success: true, user: userFound, token: req.token });
  } catch (err) {
    console.log({ err });
    res.status(503).json({ success: false, err });
  }
};

// {
//   "firstName":"Jay",
//  "lastName":"Rajput",
//  "location": "mumbai",
//  "website": "www.jayrajput30.com",
//   "email":"jayrajput@gmail.com",
//   "password": "jayrajput",
//   "username":"jayrajput30"
// }

module.exports = { addUser, findSingleUser, editExistingUser };
