const Notification = require("../models/notification.model");

const getAllNotifications = async (req, res) => {
  try {
    const allNotifications = await Notification.find({})
      .sort({ createdAt: -1 })
      .limit(15);

    // console.log({ allNotifications });
    res.status(200).json({ success: true, notifications: allNotifications });
  } catch (e) {
    res.status(503).json({ success: false, error: e });
    console.error({ error: e });
  }
};

const removeNotification = async (req, res) => {
  try {
    const { postId } = req.body;
    const allNotifications = await Notification.find({});

    allNotifications.filter((notification) => notification.postId === postId);
    await allNotifications.save();

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(503).json({ success: false, error: e });
    console.error({ error: e });
  }
};

module.exports = { getAllNotifications, removeNotification };
