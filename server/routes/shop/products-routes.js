const express = require("express");
const {
  getfilterproducts,
  getproductDetails,
} = require("../../controlers/shop/product-controllers");

const router = express.Router();

router.get("/get", getfilterproducts);
router.get("/get/:id", getproductDetails);
module.exports = router;
