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
    .isObject()
    .notEmpty()
    .custom((products) => {
      if (!Object.keys(products).length) {
        throw new Error("Products must be an array");
      }
      const existsInvalidMongoId =  Object.keys(products).some((productId) => !mongoose.isObjectIdOrHexString(productId))

      if (existsInvalidMongoId) {
        throw new Error("Invalid ObjectId in products array");
      }
      return true;
    }),
];

module.exports = orderScheme;