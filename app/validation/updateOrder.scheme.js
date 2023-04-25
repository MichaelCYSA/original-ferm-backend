const { body } = require("express-validator");

const updateOrderScheme = [body("status").optional().isIn([0, 1, 2, 3])];

module.exports = updateOrderScheme;
