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
  },
  { timestamps: true }
);

module.exports = model("Order", OrderSchema);



  const reqBody = {
    first_name: 'Hello',
    last_name: 'Mello',
    city: 'ciry',
    district: 'dixr',
    street: '234234',
    home: '32324',
    block: '324432',
    apartment: '23423',
    products: {
       '3242dsde213434232': 2,
       '234qweqwe32132113': 1,
       '1234132eqwsdqwe32': 4,
       '12312324234131112': 1
    },
  }
