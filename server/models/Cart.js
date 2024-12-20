const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
      },
      {
        quntity: {
          type: Number,
          require: true,
          min: 1,
        },
      },
    ],
  },
  { timestampes: true }
);

module.exports =mongoose.model('cart',carSchema)

