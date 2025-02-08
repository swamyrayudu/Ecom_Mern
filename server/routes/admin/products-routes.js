const express = require("express");
const {
  handleimageupload,
  addproduct,
  fetchallproducts,
  editproduct,
  deleteproduct,
} = require("../../controlers/admin/product-controllers");
const { upload } = require("../../helpers/cloudynari");

const router = express.Router();

router.post("/upload-image", upload.single("my_files"), handleimageupload);
router.post("/add", addproduct);
router.put("/edit/:id", editproduct);
router.delete("/delete/:id", deleteproduct);
router.get("/get", fetchallproducts);
module.exports = router;
