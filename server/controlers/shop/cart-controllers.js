const Product = require("../../models/products");
const Cart = require("../../models/Cart");

const addcart = async (req, res) => {
  try {
    const { userId, productId, quntity } = req.body;

    if (!userId || !productId || quntity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Founnd!",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new cart({ userId, items: [] });
    }

    const findcurrentindex = cart.items.findIndex((item) => {
      item.productId.toString() === productId;
    });
    if (findcurrentindex === -1) {
      cart.items.push({ productId, quntity });
    } else {
      cart.items[findcurrentindex].quntity += quntity;
    }

    await cart.save();
    return res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error occuered",
    });
  }
};

const fetchcartitems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "user Id not Found!",
      });
    }
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not Found!",
      });
    }

    const validitems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validitems.length < cart.items.length) {
      cart.items = validitems;
      await cart.save();
    }

    const populateCartitems = validitems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quntity: item.quntity,
    }));
    return res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        item: populateCartitems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error occuered",
    });
  }
};

const updatecartitems = async (req, res) => {
  try {
    const { userId, productId, quntity } = req.body;

    if (!userId || !productId || quntity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not Found!",
      });
    }
    const findcurrentindex = cart.items.findIndex((item) => {
      item.productId.toString() === productId;
    });
    if (findcurrentindex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item is not Found!",
      });
    }
    cart.items[findcurrentindex].quntity = quntity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartitems = validitems.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "product not found!",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quntity: item.quntity,
    }));

    return res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        item: populateCartitems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error occuered",
    });
  }
};

const deletecartitems = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not Found!",
      });
    }
    cart.items = cart.items.filter((item) => {
      item.productId._id.toString() !== productId;
    });
    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });
    const populateCartitems = validitems.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "product not found!",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quntity: item.quntity,
    }));

    return res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        item: populateCartitems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error occuered",
    });
  }
};

module.exports = {
  addcart,
  fetchcartitems,
  updatecartitems,
  deletecartitems,
};
