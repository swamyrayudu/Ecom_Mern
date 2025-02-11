const express = require("express");
const {createorder,caputurepayment,getAllorders,getAllOrderDetails} = require("../../controlers/shop/order-controllers");

const router = express.Router();

router.post("/create", createorder);
router.post("/capture", caputurepayment);
router.get("/all/:userId", getAllorders);
router.get("/details/:id", getAllOrderDetails);

module.exports = router;
