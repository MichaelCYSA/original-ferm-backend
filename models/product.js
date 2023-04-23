const {Schema , model} = require('mongoose');

const Product = new Schema({
      name_ru: {type: String},
      name_ro: {type: String},
      description_ru: {type: String},
      description_ro: {type: String},
      img: {type: String},
      price: {type: Number},   
      type: {type: String}
});

module.exports = model('Product' , Product);
