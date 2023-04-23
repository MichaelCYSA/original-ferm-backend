const { body, validationResult } = require('express-validator');

const validateProductFields = [
  body('name_ru').notEmpty(),
  body('name_ro').notEmpty(),
  body('description_ru').notEmpty(),
  body('description_ro').notEmpty(),
  body('img').notEmpty(),
  body('price').notEmpty().isNumeric(),
  body('type').notEmpty()
];


module.exports = async function (req, res, next) {

    await Promise.all(validateProductFields.map((field) => field.run(req)));
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next()
}