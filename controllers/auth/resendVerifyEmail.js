const { RequestError, sendMail, sgMailData } = require("../../helpers");
const { User } = require("../../models/user");

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, "Email not found");
  }

  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }

  await sendMail(sgMailData(user.verificationToken), next);

  res.json({ message: "Verification email sent" });
};

module.exports = resendVerifyEmail;
