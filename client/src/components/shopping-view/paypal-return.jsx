import React, { useEffect } from "react";
import { Loader } from "lucide-react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { captureOrder } from "@/store/shopslice/orderSlice";
import { data } from "autoprefixer";

export default function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      dispatch(captureOrder({ orderId, paymentId, payerId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shopping/paypal-success";
        }
      });
    }
  }, [dispatch, paymentId, payerId]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 animate-fadeIn">
      <div className="flex flex-col items-center">
        <Loader className="text-blue-500 w-24 h-24 mb-4 animate-spin" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-slideInDown">
          Processing Payment...
        </h1>
        <p className="text-lg text-gray-600 mb-8 animate-slideInUp">
          Please wait while we process your payment.
        </p>
      </div>
    </div>
  );
}
