const User = require("../models/user.model");
const Account = require("../models/account.model");

const getUserAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const userAccountFound = await Account.findOne({ uid: `${id}` });
    res.status(200).json({ success: true, userAccount });
  } catch (err) {
    console.log(err);
    res.status(503).josn({ success: false, err });
  }
};

const updateUserBio = async (req, res) => {
  try {
    const { id } = req.params;
    const { newBio } = req.body;
    const userAccountFound = await Account.findOne({ uid: `${id}` });
    userAccountFound.bio = newBio;
    await userAccountFound.save();
    res.status(200).json({ success: true, userAccount: userAccountFound });
  } catch (err) {
    console.log({ err });
    res.status(503).josn({ success: false, err });
  }
};

const followUser = async (req, res) => {
  try {
    const { followerId } = req.body;
    const { id } = req.params;
    const userFound = await User.findOne({ uid: id });
    // if (userId === userFound.uid) {
    //   res.status(503).json({ success: false, message: "cannot follow self" });
    // }
    userFound.followers.push(followerId);
    await userFound.save();
    res.status(200).json({ success: true, user: userFound });
  } catch (err) {
    console.log({ err });
    res.status(503).json({ success: false, err });
  }
};
const unfollowUser = async (req, res) => {
  try {
    const { followerId } = req.body;
    const { id } = req.params;
    const userFound = await User.findOne({ uid: id });

    userFound.followers = userFound.followers.filter(
      (item) => item.toString() != followerId.toString()
    );
    await userFound.save();
    res.status(200).json({ success: true, user: userFound });
  } catch (err) {
    console.log({ err });
    res.status(503).json({ success: false, err });
  }
};

module.exports = { getUserAccount, updateUserBio, followUser, unfollowUser };
