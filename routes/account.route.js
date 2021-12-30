const express = require("express");
const {
  getUserAccount,
  updateUserBio,
  followUser,
  unfollowUser,
} = require("../controllers/account.controller");
const router = express.Router();

router.get("/:id", getUserAccount);

router.post("/updatebio/:id", updateUserBio);

router.post("/followuser/:id", followUser);

router.post("/unfollowuser/:id", unfollowUser);

module.exports = router;
