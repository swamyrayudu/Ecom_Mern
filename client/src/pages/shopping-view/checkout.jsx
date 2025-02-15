import img2 from '../../assets/img2.jpg'
import Address from "@/components/shopping-view/address";
import CartItemContent from "@/components/shopping-view/cart-items-content";
import { useToast } from "@/hooks/use-toast";
import { createOrder } from "@/store/shopslice/orderSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shoppingcart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shoppingorder);

  const { toast } = useToast();
  const [currenaddress, setcurrentaddress] = useState(null);
  const [ispayment, setispayment] = useState(false);

  const dispatch = useDispatch();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handlecreateorder() {
    if (!cartItems?.items || cartItems.items.length === 0) {
      toast({
        title: "Your Cart is Empty!",
        description: "Please add some products to the cart to proceed.",
        variant: "destructive",
      });
      return;
    }
    

    if (!currenaddress) {
      toast({
        title: "Address not selected!",
        description: "Please select any address to proceed.",
        variant: "destructive",
      });
      return;
    }
    const orderdata = {
      userId: user?.id,
      cartId: cartItems._id,
      cartItems: cartItems?.items?.map((singlecartItem) => ({
        productId: singlecartItem?.productId,
        image: singlecartItem?.image,
        title: singlecartItem?.title,
        price:
          singlecartItem?.price > 0
            ? singlecartItem?.salePrice
            : singlecartItem?.price,
        quantity: singlecartItem?.quantity,
      })),
      addressDetails: {
        addressId: currenaddress?._id,
        address: currenaddress?.address,
        pincode: currenaddress?.pincode,
        city: currenaddress?.city,
        phone: currenaddress?.phone,
        notes: currenaddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentId: "",
      paymentStatus: "canceled",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdate: new Date(),
      payerId: "",
    };
    dispatch(createOrder(orderdata)).then((data) => {
      if (data?.payload?.success) {
        setispayment(true);
      } else {
        setispayment(false);
      }
    });
  }
  if (approvalURL) {
    window.location.href = approvalURL;
  }


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img2}
          className="h-full w-full object-cover object-center"
          alt="Shopping Checkout"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Checkout</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Your Cart
            </h2>
            <div className="space-y-6">
              {cartItems && cartItems.items && cartItems.items.length > 0 ? (
                cartItems.items.map((item, index) => (
                  <CartItemContent key={index} cartItems={item} />
                ))
              ) : (
                <p className="text-lg text-gray-500">Your cart is empty.</p>
              )}
            </div>

            {/* Total Amount Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-800">
                  Total Amount
                </span>
                <span className="text-xl font-bold text-black">
                  {totalCartAmount.toFixed(2)}$
                </span>
              </div>
              {/* Pay Button */}
              <button
                onClick={handlecreateorder}
                className="w-full mt-6 bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300"
              >
                {ispayment
                  ? "Processing paypal payment ..."
                  : `Pay ${totalCartAmount.toFixed(2)}$`}
              </button>
            </div>
          </div>

          {/* Delivery Address Section */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Delivery Address
            </h2>
            <Address
              selectedID={currenaddress}
              setcurrentaddress={setcurrentaddress}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
