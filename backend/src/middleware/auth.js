const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: false,
      message: "No token provided",
    });
  }
  const decodeToken = jwt.decode(token);
  const userId = decodeToken.id;
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  //   console.log(verifyTokenId);
  if (token != user.tokenKey) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: false,
      message: "Invalid token provided",
    });
  }

  if (!user) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      status: false,
      message: "Unauthorized to access the data",
    });
  }

  next();
};

module.exports = {
  verifyToken,
};
