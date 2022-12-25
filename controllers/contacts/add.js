const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const add = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    if (!contact) {
      throw createError(404);
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
