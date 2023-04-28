const { body } = require("express-validator");

const productScheme = [
  body("name_ru").notEmpty(),
  body("name_ro").notEmpty(),
  body("description_ru").notEmpty(),
  body("description_ro").notEmpty(),
  body("image").notEmpty(),
  body("price").notEmpty().isNumeric(),
  body("productType").notEmpty(),
];

module.exports = productScheme
