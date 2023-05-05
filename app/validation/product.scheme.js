const { body } = require("express-validator");

const productScheme = [
  body("name.ru").notEmpty(),
  body("name.ro").notEmpty(),
  //body("description.ru").notEmpty(),
  //body("description.ro").notEmpty(),
  body("image").notEmpty(),
  body("price").notEmpty().isNumeric(),
  body("productType").notEmpty(),
];

module.exports = productScheme;
