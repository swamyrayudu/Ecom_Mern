const express = require('express');
const { getfilterproducts } = require('../../controlers/shop/product-controllers');

const router = express.Router()


router.get('/get',getfilterproducts)
module.exports = router