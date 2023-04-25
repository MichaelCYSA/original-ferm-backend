const { body } = require("express-validator");

const orderScheme = [
  body("first_name").notEmpty(),
  body("last_name").notEmpty(),
  body("city").notEmpty(),
  body("street").notEmpty(),
  body("home").notEmpty(),
  body("status").optional().isIn([0]),
];

module.exports = orderScheme
