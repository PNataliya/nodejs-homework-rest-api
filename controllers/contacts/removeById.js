const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);

    if (!result) {
      throw createError(404);
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact delete",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;

// const removeById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndRemove(contactId);
//   if (!result) {
//     throw createError(404);
//   }
//   res.json({
//     status: "success",
//     code: 200,
//     message: "contact delete",
//     data: {
//       result,
//     },
//   });
// };
