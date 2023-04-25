const { validationResult } = require("express-validator");

const ValidationMiddleware = async (req, res, next) => {
  await Promise.all(req.scheme.map((field) => field.run(req)));
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

const SchemeWrapper = (scheme) => {
  return (req, res, next) => {
    req.scheme = scheme;
    ValidationMiddleware(req, res, next);
  };
};

module.exports = SchemeWrapper;
