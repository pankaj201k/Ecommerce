const express = require("express");
const UserRoute = require("./user.route");
const router = express.Router();

const defaultRoutes = [
  {
    path: "/user",
    route: UserRoute,
  },
  //   {
  //     path: "/student",
  //     route: otpVerifyRoute,
  //   },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
