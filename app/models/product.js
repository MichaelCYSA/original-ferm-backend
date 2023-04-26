const { Schema, model } = require("mongoose");

const Product = new Schema({
  name_ru: { type: String },
  name_ro: { type: String },
  description_ru: { type: String },
  description_ro: { type: String },
  image: { type: String },
  price: { type: Number },
  productType: { type: String },
});

module.exports = model("Product", Product);
