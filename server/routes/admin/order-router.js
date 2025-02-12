const express = require("express");
const { getAllOrderDetailsAdmin,getAllordersAdmin} = require("../../controlers/admin/order-controllers");

const router = express.Router();

router.get("/alladminorders", getAllordersAdmin);
router.get("/detailsadminorders/:id", getAllOrderDetailsAdmin);

module.exports = router;
