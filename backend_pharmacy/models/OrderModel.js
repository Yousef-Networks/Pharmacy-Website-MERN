const mongoose = require('mongoose');



const orderSchema = new mongoose.Schema({
      username: {
        type: String,
        ref:'PatientPModel'}
      ,
    statuss: {
        type: String,
        enum: ['Pending', 'Shipped', 'Cancelled'],
        default: 'Pending',
      },
      shippingAddress: {
        type: String,
        required: true,
      },
      paymentMethod: {
        type: String,
        enum: ['Wallet', 'Credit Card', 'Cash on Delivery'],
        default: 'Cash on Delivery',
      }
    
  });
  const Order = mongoose.model('Order', orderSchema);
  module.exports = Order; 