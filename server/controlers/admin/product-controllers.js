const { ImageUpload } = require("../../helpers/cloudynari");
const products = require("../../models/products");

const handleimageupload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUpload(url);

    res.json({
      success: true,
      result,
    });  


    
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "error occurred while uploading",
    });
  }
};

// add a product
const addproduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newcreatedproduct = new products({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await newcreatedproduct.save();
    res.status(201).json({
      success: true,
      data: newcreatedproduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "some occure error",
    });
  }
};

// fetch all products
const fetchallproducts = async (req, res) => {
  try {
    const listofallproducts = await products.find({});
    res.status(201).json({
      success: true,
      data: listofallproducts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "some occure error",
    });
  }
};

// edit a product
const editproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findProduct = await products.findById(id);
    if (!findProduct)
      return res.json({
        success: false,
        message: "product not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.category = category || findProduct.category;
    findProduct.description = description || findProduct.description;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    findProduct.brand = brand || findProduct.brand;

    await findProduct.save();
    res.status(201).json({
      success: true,
      data: findProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "some occure error",
    });
  }
};

// delete a product
const deleteproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await products.findByIdAndDelete(id);
    if (!product)
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    res.status(201).json({
      success: true,
      message: "product delete successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "some occure error",
    });
  }
};

module.exports = {
  handleimageupload,
  addproduct,
  fetchallproducts,
  editproduct,
  deleteproduct,
};
