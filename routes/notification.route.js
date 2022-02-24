const express = require("express");

const router = express.Router();

const authenticateRoute = require("../middlewares/route.auth");

const {
  getAllNotifications,
  removeNotification,
} = require("../controllers/notification.controller");

router.get("/", authenticateRoute, getAllNotifications);

router.post("/remove", authenticateRoute, removeNotification);

module.exports = router;
