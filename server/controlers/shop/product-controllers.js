const Product = require("../../models/products");

const getfilterproducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(500).json({
      success:true,  
      message: "some error occuered",
      data: products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success:false,  
      message: "some error occuered",
    });
  }
};
module.exports = { getfilterproducts };
