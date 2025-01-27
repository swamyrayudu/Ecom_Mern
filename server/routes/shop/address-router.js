const express = require("express");
const {
  addAdress,
  editAdress,
  deleteAdress,
  fetchAdress,
} = require("../../controlers/shop/address-controllers");

const router = express.Router();

router.post("/add", addAdress);
router.get("/fetch/:userId", fetchAdress);
router.put("/edit/:userId/:addressId", editAdress);
router.delete("/delete/:userId/:addressId", deleteAdress);

module.exports = router;
