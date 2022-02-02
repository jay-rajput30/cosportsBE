const express = require("express");
const {
  getUserAccount,
  getAccountDetail,
  updateUserDetail,
  followUser,
  unfollowUser,
} = require("../controllers/account.controller");
const authenticateRoute = require("../middlewares/route.auth");
const router = express.Router();

router.get("/", authenticateRoute, getUserAccount);

router.get("/accountdetail", authenticateRoute, getAccountDetail);

router.post("/updatedetail", authenticateRoute, updateUserDetail);

router.post("/followuser", authenticateRoute, followUser);

router.post("/unfollowuser", authenticateRoute, unfollowUser);

module.exports = router;
