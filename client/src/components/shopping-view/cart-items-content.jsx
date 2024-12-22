import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updatCartItem } from "@/store/shopslice/cartSlice";
import { useToast } from "@/hooks/use-toast";

export default function CartItemContent({ cartItems }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, actionType) {
    dispatch(
      updatCartItem({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          actionType === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Cart updated successfully" });
      }
    });
  }

  function handleDeleteCart(getCartItem) {
    dispatch(
      deleteCartItem({
        userId: user?.id,
        productId: getCartItem?.productId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Cart item deleted successfully" });
      }
    });
  }

  return (
    <div className="flex items-center p-3 bg-white rounded shadow space-x-4 border">
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        className="w-16 h-16 rounded object-cover border"
      />

      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-800">{cartItems?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            onClick={() => handleUpdateQuantity(cartItems, "minus")}
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full border"
            disabled={cartItems?.quantity === 1}
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </Button>
          <span className="text-gray-700 text-sm font-medium">
            {cartItems?.quantity}
          </span>
          <Button
            onClick={() => handleUpdateQuantity(cartItems, "plus")}
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full border"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end space-y-1">
        <p className="text-sm font-bold text-gray-800">
          {(
            (cartItems?.salePrice > 0
              ? cartItems?.salePrice
              : cartItems?.price) * cartItems?.quantity
          ).toFixed(2)}
          ₹
        </p>
        <Trash
          onClick={() => handleDeleteCart(cartItems)}
          className="text-red-500 hover:text-red-700 cursor-pointer"
          size={20}
        />
      </div>
    </div>
  );
}
