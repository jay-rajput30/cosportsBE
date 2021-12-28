const express = require("express");
const router = express.Router();

const { addUser } = require("../controllers/user.controller");

router.post("/", addUser);
router.get("/singleuser", async (req, res) => {
  try {
  } catch (err) {
    console.log({ err });
    res.status(503).json({ success: false, err });
  }
});

module.exports = router;
