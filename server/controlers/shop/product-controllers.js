const Product = require("../../models/products");

const getfilterproducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filter = {};
    if (category.length) {
      filter.category = { $in: category.split(",") };
    }
    if (brand.length) {
      filter.brand = { $in: brand.split(",") };
    }
    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort = { salePrice: 1, price: 1 };
        break;
      case "price-hightolow":
        sort = { salePrice: -1, price: -1 };
        break;
      case "title-atoz":
        sort = { title: 1 };
        break;
      case "title-ztoa":
        sort = { title: -1 };
      default:
        sort = { salePrice: 1, price: 1 }; 
        break;
    }
    

    const products = await Product.find(filter).sort(sort);
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

const getproductDetails = async(req,res)=>{
  try{
    const {id} =req.params;
    const product = await Product.findById(id);

    if(!product){
      return res.status(404).json({
        success: false,
        message: "Product not Found!",
      });
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      message: "some error occuered",
    });
  }
}
module.exports = { getfilterproducts,getproductDetails };
