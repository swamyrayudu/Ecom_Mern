require('dotenv').config()


const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-router");
const adminproductRouter = require("./routes/admin/products-routes");
const shoppingproductRouter = require("./routes/shop/products-routes");
const ShoppingcartRouter = require("./routes/cart/cart-router");
const ShoppingAddressRouter = require("./routes/shop/address-router");
const ShoppingOrderRouter = require("./routes/shop/order-router");
const AdminOrderRouter = require("./routes/admin/order-router");
const searchRouter = require("./routes/shop/search-router"); // Add search router
const commonRouter = require("./routes/commen/feature-router");

const app = express();



const PORT = process.env.PORT || 9001

app.use(cors({
  origin: process.env.CLIENT_BASE_URL,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Cache-Control',
    'Expires',

  ],
  credentials: true
}));
app.get("/" , (req , res)=> {
  res.send("It's Working")
})
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminproductRouter);
app.use("/api/shopping/products", shoppingproductRouter);
app.use("/api/shopping/cart", ShoppingcartRouter);
app.use("/api/shopping/address", ShoppingAddressRouter);
app.use("/api/shopping/order", ShoppingOrderRouter);
app.use("/api/admin/orders", AdminOrderRouter);
app.use("/api/shopping", searchRouter);
app.use("/api/commen/feature", commonRouter);




// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
  });


app.listen(PORT, () => {
  console.log("server running");
})

