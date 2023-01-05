const express = require("express");

const { auth: ctrl } = require("../../controllers");

const { validationBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

// signup
router.post(
  "/users/signup",
  validationBody(schemas.registerSchema),
  ctrl.signup
);

// signin
router.post("/users/login", validationBody(schemas.loginSchema), ctrl.login);

router.get("/users/current", authenticate, ctrl.getCurrent);

// router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
