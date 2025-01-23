const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    userId: String,
    address: String,
    pincode: String,
    city: String,
    phone: String,
    note: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
