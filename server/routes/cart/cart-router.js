const express = require("express");
const {
  addcart,
  fetchcartitems,
  deletecartitems,
  updatecartitems,
} = require("../../controlers/shop/cart-controllers");

const router = express.Router();

router.post("/add", addcart);
router.get("/get/:userId", fetchcartitems);
router.delete("/:userId/:productId", deletecartitems);
router.put("/update-cart", updatecartitems);

module.exports = router;
