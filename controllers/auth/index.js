const signup = require("./signup");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateAvatar = require("./updateAvatar");
const resendVerifyEmail = require("./resendVerifyEmail");
const verifyEmail = require("./verifyEmail");

module.exports = {
  signup,
  login,
  getCurrent,
  logout,
  updateAvatar,
  resendVerifyEmail,
  verifyEmail,
};
