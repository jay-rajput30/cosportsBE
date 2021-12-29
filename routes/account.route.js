const express = require("express");
const {
  getUserAccount,
  updateUserBio,
  folllowUser,
} = require("../controllers/account.controller");
const router = express.Router();

router.get("/:id", getUserAccount);

router.post("/updatebio/:id", updateUserBio);

router.post("/followuser/:id", folllowUser);
router.post("/unfollowuser");

module.exports = router;
