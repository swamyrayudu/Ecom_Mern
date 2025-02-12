const mongoose = require("mongoose");
const Orders = require("../../models/Order");

const getAllordersAdmin = async (req, res) => {
  try {
    const orders = await Orders.find({});

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All orders",
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "error occured",
    });
  }
};

const getAllOrderDetailsAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Orders.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "No order found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order details",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "error occured",
    });
  }
};

const upadateorderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Orders.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "No order found",
      });
    }

    await Orders.findByIdAndUpdate(id, { orderStatus });

    res.status(200).json({
      success: true,
      message: "Order status updated",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "error occured",
    });
  }
};

module.exports = { getAllOrderDetailsAdmin, getAllordersAdmin, upadateorderStatus };
