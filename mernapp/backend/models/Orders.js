const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  order_data: {
    type: Array,
    required: true,
  },
  order_date: {
    type: Date,
    default: Date.now, // Automatically adds the order date
  },
});

module.exports = mongoose.model('Order', OrderSchema);
