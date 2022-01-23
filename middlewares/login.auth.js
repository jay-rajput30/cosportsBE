const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");


const loginVerify = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const userFound = await User.findOne({ username: username.toString() });
    
    console.log({ username, password, userFound });
    bcrypt.compare(password, userFound.password, (err, result) => {
      if (result) {
        const userDetails = {
          userId: userFound._id,
          username: userFound.username,
          email: userFound.email,
        };
        const token = jwt.sign(userDetails, process.env.MY_SECRET_KEY, {
          expiresIn: "12000000ms",
        });

        userFound.password = undefined;
        req.userFound = userFound;
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
