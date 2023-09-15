const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String, // You can store the image URL or file path here
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0 // Ensure quantity is non-negative
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});


const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
