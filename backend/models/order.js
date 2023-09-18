const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  user_email:{
    type:String,
  },
  item_name: {
    type: String,
    required: true,
  },
  item_id: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false, 
  },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
