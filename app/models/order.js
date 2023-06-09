const { Schema, model } = require("mongoose");

const OrderSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    city: { type: String },
    district: { type: String },
    street: { type: String },
    home: { type: String },
    block: { type: String },
    apartment: { type: String },
    status: { type: Number, enum: [0, 1, 2, 3], default: 0 },
    totalPrice: { type: Number },
    products: { type: Schema.Types.Array },
    phone: {
      type: Schema.Types.String,
    }
  },
  { timestamps: true }
);

module.exports = model("Order", OrderSchema);
