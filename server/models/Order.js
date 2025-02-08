const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  cartId: String,
  cartItems: [
    {
      productId: String,
      image: String,
      title: String,
      price: String,
      quantity: Number,
    },
  ],
  addressDetails: {
    addressId: String,
    address: String,
    pincode: String,
    city: String,
    phone: String,
    notes: String,
  },
  orderStatus: String,
  paymentMethod: String,
  orderUpdate: Date,
  paymentId: String,
  paymentStatus: String,
  totalAmount: String,
  orderDate: Date,
  payerId: String,
})

module.exports = mongoose.model('ordersdetails',OrderSchema)
