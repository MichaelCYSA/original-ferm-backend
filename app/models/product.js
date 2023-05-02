const { Schema, model } = require("mongoose");

const Product = new Schema({
  description: {
    ru: { type: Schema.Types.String },
    ro: { type: Schema.Types.String },
  },
  name: {
    ru: { type: Schema.Types.String },
    ro: { type: Schema.Types.String },
  },
  image: { type: Schema.Types.String },
  price: { type: Schema.Types.Number },
  productType: { type: Schema.Types.String },
});

module.exports = model("Product", Product);
