const express = require("express");
const {
  getUserAccount,
  updateUserBio,
} = require("../controllers/account.controller");
const router = express.Router();

router.get("/:id", getUserAccount);

router.post("/updatebio/:id", updateUserBio);

module.exports = router;
