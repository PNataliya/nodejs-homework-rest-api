const express = require("express");

const { auth: ctrl } = require("../../controllers");

const { validationBody, authenticate, upload } = require("../../middlewares");

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

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

router.get("/users/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/users/verify",
  validationBody(schemas.resendVerifyEmailJoiSchema),
  ctrl.resendVerifyEmail
);

module.exports = router;
