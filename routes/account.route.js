const express = require("express");
const {
  getUserAccount,
  updateUserBio,
  followUser,
  unfollowUser,
} = require("../controllers/account.controller");
const authenticateRoute = require("../middlewares/route.auth");
const router = express.Router();

router.get("/", authenticateRoute, getUserAccount);

router.post("/updatebio/:id", updateUserBio); //this route is not used

router.post("/followuser", authenticateRoute, followUser);

router.post("/unfollowuser", authenticateRoute, unfollowUser);

module.exports = router;
