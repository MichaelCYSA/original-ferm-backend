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
        throw new Error("Products must be not empty!");
      }
      const existsInvalidMongoId =  Object.keys(products).some((productId) => !mongoose.isObjectIdOrHexString(productId))

      if (existsInvalidMongoId) {
        throw new Error("Exists invalid ObjectId in products");
      }
      return true;
    }),
];

module.exports = orderScheme;