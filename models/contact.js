const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name must be exist"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email must be exist"],
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Phone must be exist"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post("save", handleSchemaValidationErrors);

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const updateJoiSchema = Joi.object({
  name: Joi.string().min(3).max(30).trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  addSchema,
  updateJoiSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
