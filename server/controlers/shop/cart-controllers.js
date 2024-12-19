const { model } = require("mongoose");

const addcart = async (req, res) => {
  try {
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
