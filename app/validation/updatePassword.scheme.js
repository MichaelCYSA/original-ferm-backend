const { body } = require("express-validator");

const updatePasswordScheme = [
  body("email").notEmpty(),
  body("old_password").notEmpty(),
  body("new_password").notEmpty(),
  body("repeated_new_password").notEmpty(),
  body("new_password").custom((value, { req }) => {
    if (value !== req.body.repeated_new_password) {
      throw new Error("New password and repeated new password do not match");
    }
    return true;
  }),
];

module.exports = updatePasswordScheme;
