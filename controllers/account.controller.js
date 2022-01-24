const User = require("../models/user.model");
const Account = require("../models/account.model");

const getUserAccount = async (req, res) => {
  try {
    const { userId } = req.data;
    const userAccountFound = await Account.findOne({ uid: `${userId}` });
    res.status(200).json({ success: true, user: userAccountFound });
  } catch (err) {
    console.log(err);
    res.status(503).json({ success: false, err });
  }
};

const updateUserBio = async (req, res) => {
  try {
    const { userId } = req.data;
    const { newBio } = req.body;
    const userAccountFound = await Account.findOne({ uid: `${userId}` });
    userAccountFound.bio = newBio;
    await userAccountFound.save();
    res.status(200).json({ success: true, userAccount: userAccountFound });
  } catch (err) {
    console.log({ err });
    res.status(503).json({ success: false, err });
  }
};

const followUser = async (req, res) => {
  try {
    const { followerId } = req.body;
    const { userId } = req.data;
    const followingAccount = await Account.findOne({ uid: followerId });
    const accountFound = await Account.findOne({ uid: userId });

    // if (userId === userFound.uid) {
    //   res.status(503).json({ success: false, message: "cannot follow self" });
    // }

    const alreadyFollower = accountFound.followers.findIndex(
      (item) => item.toString() == followerId.toString()
    );
    const alreadyFollowing = followingAccount.following.findIndex(
      (item) => item.toString() == userId.toString()
    );
    if (alreadyFollower === -1 && alreadyFollowing === -1) {
      accountFound.followers.push(followerId);
      followingAccount.following.push(userId);
      await accountFound.save();
      await followingAccount.save();
    }

    console.log({ followingAccount, accountFound });
    res
      .status(200)
      .json({ success: true, user: accountFound, token: req.token });
  } catch (err) {
    console.log({ err });
    res.status(503).json({ success: false, err });
  }
};
const unfollowUser = async (req, res) => {
  try {
    const { followerId } = req.body;
    const { userId } = req.data;
    const userFound = await Account.findOne({ uid: userId });
    const followerAccount = await Account.findOne({ uid: followerId });
    userFound.followers = userFound.followers.filter(
      (item) => item.toString() != followerId.toString()
    );
    followerAccount.following = followerAccount.following.filter(
      (item) => item.toString() != userId.toString()
    );
    await userFound.save();
    await followerAccount.save();

    res.status(200).json({ success: true, user: userFound });
  } catch (err) {
    console.log({ err });
    res.status(503).json({ success: false, err });
  }
};

module.exports = { getUserAccount, updateUserBio, followUser, unfollowUser };
