const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/user.model");

const loginVerify = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username.toString() });
    bcrypt.compare(password, userFound.password, (err, result) => {
      if (result) {
        const userDetails = {
          userId: userFound._id,
          username: userFound.username,
          email: userFound.email,
        };
        const token = jwt.sign(userDetails, process.env.MY_SECRET_KEY, {
          expiresIn: "600000ms",
        });

        userFound.password = undefined;
        req.user = user;
        req.token = token;
        next();
      } else {
        res.status(401).json({ success: false, err });
      }
    });
  } catch (err) {
    res.status(401).json({ success: false, err: err });
  }
};

module.exports = loginVerify;
