const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw RequestError(400, "Bad Request. Please add avatar image.");
    }
    const { path: tempUpload, filename } = req.file;
    const { _id } = req.user;
    const [extention] = filename.split(".").reverse();
    const newFileName = `${_id}.${extention}`;
    const resultUpload = path.join(avatarsDir, newFileName);
    await fs.rename(tempUpload, resultUpload);
    const file = await Jimp.read(resultUpload);
    const fileResize = await file.resize(250, 250);
    await fileResize.write(resultUpload);
    const avatarURL = path.join("avatars", newFileName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.tempUpload);
    }
    next(error);
  }
};

module.exports = updateAvatar;
