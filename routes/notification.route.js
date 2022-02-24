const express = require("express");

const router = express.Router();
const Notification = require("../models/notification.model");

const authenticateRoute = require("../middlewares/route.auth");

router.get("/", authenticateRoute, async (req, res) => {
  try {
    const allNotifications = await Notification.find({})
      .sort({ createdAt: 1 })
      .limit(15);

    console.log({ allNotifications });
    res.status(200).json({ success: true, notifications: allNotifications });
  } catch (e) {
    res.status(503).json({ success: false, error: e });
    console.error({ error: e });
  }
});

module.exports = router;
