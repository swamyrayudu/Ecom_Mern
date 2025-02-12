const express = require("express");
const { getAllOrderDetailsAdmin,getAllordersAdmin,upadateorderStatus} = require("../../controlers/admin/order-controllers");

const router = express.Router();

router.get("/alladminorders", getAllordersAdmin);
router.get("/detailsadminorders/:id", getAllOrderDetailsAdmin);
router.put("/updateorderstatus/:id", upadateorderStatus);


module.exports = router;
