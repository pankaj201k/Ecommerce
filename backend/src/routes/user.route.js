const express = require("express");
const controller = require("../controllers/user.controller");
const validate = require("../middleware/validate");
const userValidate = require("../validations/user.validation");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/user", validate(userValidate.createUser), controller.createUser);
router.post("/login", validate(userValidate.login), controller.userLogin);
router.get("/getUser/:userId", [auth.verifyToken], controller.getUserById);
router.patch("/updateUser/:userId", auth.verifyToken, controller.updateUser);
router.post("/signout", auth.verifyToken, controller.signoutUser);

module.exports = router;
