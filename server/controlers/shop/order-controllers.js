const Orders = require("../../models/Order");
const paypal = require("../../helpers/Paypal");
const { model } = require("mongoose");

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
        return_url: "http://localhost:5173/shopping/paypal-return",
        cancel_url: "http://localhost:5173/shopping/paypal-cancel",
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
            totalAmount: item.totalAmount,
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

        const apprrovalURl = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(201).json({
          success: true,
          apprrovalURl,
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
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "error occured",
    });
  }
};

module.exports ={createorder,caputurepayment}
