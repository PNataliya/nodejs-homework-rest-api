const { Contact } = require("../../models/contact");
const RequestError = require("../../helpers");

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const contact = await Contact.create({ ...req.body, owner });
    if (!contact) {
      throw RequestError(404);
    }
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
