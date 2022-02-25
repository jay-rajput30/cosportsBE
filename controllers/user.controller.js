const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Account = require("../models/account.model");
const jwt = require("jsonwebtoken");
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await Account.find({}).populate("uid");

  
    res.status(200).json({ success: true, users: allUsers });
  } catch (err) {
    console.log({ err });
    res.status(503).json({ success: false, err });
  }
};

const addUser = async (req, res) => {
  try {
    const { formData } = req.body;

    const allUsers = await User.find({});
    console.log({
      allUsers,
      formData,
      username: formData.username,
    });
    console.log(formData.username);
    const usernameAlreadyExists = allUsers.findIndex((user) => {
      console.log({ username: user.username, reqUsername: formData.username });
      return user.username.toString() == formData.username.toString();
    });
    const emailAlreadyExists = allUsers.findIndex(
      (user) => user.email.toString() === formData.email.toString()
    );
    console.log({ usernameAlreadyExists, emailAlreadyExists });
    if (usernameAlreadyExists === -1 && emailAlreadyExists === -1) {
      bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(formData.password, salt, async (err, hash) => {
          const user = new User({
            firstName: formData.firstName,
            lastName: formData.lastName,
            location: formData.location,
            website: formData.website,
            email: formData.email,
            username: formData.username,
            password: hash,
          });
          await user.save();

          const account = new Account({
            uid: user._id,
            following: [],
            followers: [],
            bio: "",
          });

          await account.save();

          const userDetails = {
            userId: user._id,
            username: user.username,
            email: user.email,
          };
          const token = jwt.sign(userDetails, process.env.MY_SECRET_KEY, {
            expiresIn: "12000000ms",
          });

          user.password = undefined;

          res.status(200).json({
            success: true,
            user,
            token,
          });
        });
      });
    } else if (usernameAlreadyExists !== -1) {
      res.status(503).json({
        success: false,
        err: "username  already exists. try different one",
      });
    } else if (emailAlreadyExists !== -1) {
      res.status(503).json({
        success: false,
        err: "email  already exists. try different one",
      });
    }
  } catch (err) {
    console.log({ err });
    res.status(503).json({ success: false, err });
  }
};

const findSingleUser = async (req, res) => {
  try {
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

const getSingleUser = async (req, res) => {
  try {
    const { userId } = req.data;
    const userData = await User.findById(userId);
    const userAccountDetails = await Account.findOne({
      uid: userId,
    }).populate("uid");
    const updatedUserDetails = {
      ...userData._doc,
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

module.exports = {
  addUser,
  findSingleUser,
  getSingleUser,
  editExistingUser,
  getAllUsers,
};
