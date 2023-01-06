const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const {
  isValidId,
  validationBody,
  authenticate,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validationBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validationBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
