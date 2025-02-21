const Orders = require("../../models/Order");
const Cart = require("../../models/Cart");
const paypal = require("../../helpers/Paypal");
const Product = require("../../models/products");

const createorder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressDetails,
      orderStatus,
      paymentMethod,
      paymentId,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdate,
      payerId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.CLIENT_BASE_URL}/shopping/paypal-return`,
        cancel_url: `${process.env.CLIENT_BASE_URL}/shopping/paypal-cancel`,
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "description",
        },
      ],
    };
    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "error occured on createing payment",
        });
      } else {
        const newlycreatedorder = new Orders({
          userId,
          cartId,
          cartItems,
          addressDetails,
          orderStatus,
          paymentMethod,
          paymentId,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdate,
          payerId,
        });

        await newlycreatedorder.save();

        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        )?.href;

        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newlycreatedorder._id,
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "error occured",
    });
  }
};

const caputurepayment = async (req, res) => {
  try {
    const { orderId, paymentId, payerId } = req.body;

    let order = await Orders.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      product.totalStock = product.totalStock - item.quantity;
      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
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

const getAllorders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Orders.find({ userId });

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

const getAllOrderDetails = async (req, res) => {
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

module.exports = {
  createorder,
  caputurepayment,
  getAllorders,
  getAllOrderDetails,
};
