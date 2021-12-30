const jwt = require("jsonwebtoken");

const authenticateRoute = async (req, res, next) => {
  const token = req.headers.authorization;
  //   console.log({ header: req.headers.authorization });
  if (!token) {
    res.status(401).json({ success: false, message: "user not authenticated" });
  }
  try {
    const data = jwt.verify(token, process.env.MY_SECRET_KEY);
    req.data = data;
    req.token = token;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, err });
  }
};

module.exports = authenticateRoute;
