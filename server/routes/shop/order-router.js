const express = require("express");
const {
  createorder,
  caputurepayment,
} = require("../../controlers/shop/order-controllers");

const router = express.Router();

router.post("/create", createorder);

module.exports = router;
