const httpStatus = require("http-status");
const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
const createUser = async (req, res) => {
  const emailExist = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (emailExist) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ status: true, message: "Email already exist" });
  }
  const mobileNumberExist = await User.findOne({
    where: {
      mobileNumber: req.body.mobileNumber,
    },
  });
  if (mobileNumberExist) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ status: true, message: "Mobile number already exist" });
  }
  const result = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  return res
    .status(httpStatus.CREATED)
    .send({ status: true, message: "Created successfully", data: result });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ status: false, message: "Enter correct email" });
  }
  const comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ status: false, message: "Enter correct password" });
  }

  const token = await jwt.sign({ id: user.id }, process.env.API_SECRET);

  await User.update(
    { tokenKey: token },
    {
      where: {
        id: user.id,
      },
    }
  );
  res.header("x-access-token", token);
  return res.status(httpStatus.OK).send({
    message: "Login successfully",
    data: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token,
    },
  });
};
const getUserById = async (req, res) => {
  const user = await User.findOne({
    attributes: {
      exclude: ["password", "tokenKey"],
    },
    where: {
      id: req.params.userId,
    },
  });
  if (!user) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ status: false, message: "User not found" });
  }
  return res
    .status(httpStatus.OK)
    .send({ status: true, message: "User found successfully", data: user });
};
const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.userId,
    },
  });
  if (!user) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ status: false, message: "User not found" });
  }
  const update = await User.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobileNumber: req.body.mobileNumber,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    },
    {
      where: {
        id: req.params.userId,
      },
    }
  );
  return res
    .status(httpStatus.OK)
    .send({ status: false, message: "User updated successfully" });
};

const signoutUser = async (req, res) => {
  const token = req.headers["x-access-token"];
  const tokenDecode = jwt.decode(token);
  const userId = tokenDecode.id;
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });
  if (token != user.tokenKey) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ status: false, message: "Token not match" });
  }
  const updateToken = await User.update(
    {
      tokenKey: null,
    },
    {
      where: {
        id: userId,
      },
    }
  );
  return res.status(httpStatus.OK).send({status:true,message:"Signout successfully"})
};
module.exports = {
  createUser,
  userLogin,
  getUserById,
  updateUser,
  signoutUser
};
