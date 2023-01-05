const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.user;
  const skip = (page - 1) * limit;

  try {
    const contacts = await Contact.find({ owner }, "-createdAt -updateAt", {
      skip,
      limit,
    }).populate("owner", "name email");
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
