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

const updateUserDetail = async (req, res) => {
  try {
    const { userId } = req.data;
    const { updatedUserDetails } = req.body;
    const userAccountFound = await Account.findOne({ uid: `${userId}` });
    userAccountFound.bio = updatedUserDetails.newBio;
    await userAccountFound.save();
    const [fName, lName] = updatedUserDetails.newFullName.split(" ");
    console.log(fName + "," + lName);
    const userFound = await User.findById(userId);
    userFound.firstName = fName;
    userFound.lastName = lName === undefined ? "" : lName;
    await userFound.save();
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

const getAccountDetail = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    const allUsers = await User.find({});
    const userFind = allUsers.filter((item) => {
      const fullName = (item.firstName + " " + item.lastName)
        .toString()
        .toLowerCase();

      if (
        fullName.includes(searchTerm.toString().toLowerCase()) ||
        item.username.includes(searchTerm.toString().toLowerCase())
      ) {
        return { uid: item._id };
      }
    });

    let ids = userFind.map((item) => item._id);

    const AccountFound = await Account.find({ uid: { $in: ids } }).populate(
      "uid"
    );
    res.status(200).json({ success: true, accounts: AccountFound });
  } catch (e) {
    console.log({ e });
    res.status(503).json({ success: false, e });
  }
};

module.exports = {
  getUserAccount,
  updateUserDetail,
  followUser,
  unfollowUser,
  getAccountDetail,
};
