const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/user.model");

const loginVerify = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    bcrypt.compare(password, userFound.password, (err, result) => {
      if (result) {
        const userDetails = {
          userId: userFound._id,
          name: userFound.username,
          email: userFound.email,
        };
        const token = jwt.sign(userDetails, process.env.MY_SECRET_KEY, {
          expiresIn: "600000ms",
        });

        userFound.password = undefined;
        req.userFound = user;
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
