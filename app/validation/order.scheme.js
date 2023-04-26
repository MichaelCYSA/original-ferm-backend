const { body } = require("express-validator");
const mongoose = require("mongoose");

const orderScheme = [
  body("first_name").notEmpty(),
  body("last_name").notEmpty(),
  body("city").notEmpty(),
  body("street").notEmpty(),
  body("home").notEmpty(),
  body("status").optional().isIn([0]),
  body("products")
    .isArray()
    .notEmpty()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error("Products must be an array");
      }
      if (value.some((id) => !mongoose.isValidObjectId(id))) {
        throw new Error("Invalid ObjectId in products array");
      }
      return true;
    }),
];

module.exports = orderScheme;
