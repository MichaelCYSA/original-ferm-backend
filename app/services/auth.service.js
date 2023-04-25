const config = require("../../config.json");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ServiceErrorHandler = require("../@lib/serviceErrorHandler");

class Auth {
  registration = ServiceErrorHandler(async (req, res) => {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw new Error({
        status: 400,
        message: "User exists already",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword });

    await user.save();

    return res.status(201).json({ message: "User created!" });
  });

  login = ServiceErrorHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid data !" });
    }

    const isMathPassword = await bcrypt.compare(password, user.password);

    if (!isMathPassword) {
      return res.status(400).json({ message: "Invalid data !" });
    }

    const token = jwt.sign({ userId: user.id }, config.SECRET_KEY, {
      expiresIn: "12h",
    });

    res.json({ token });
  });
}
module.exports = new Auth();
