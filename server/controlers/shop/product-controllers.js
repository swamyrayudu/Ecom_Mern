const Product = require("../../models/products");

const getfilterproducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      message: "products found",
      data: products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "some error occuered",
    });
  }
};
module.exports = { getfilterproducts };
