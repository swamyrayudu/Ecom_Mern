import React from "react";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Button } from "../ui/button";
import CartItemContent from "./cart-items-content";

export default function CartWrapper({ cartItems }) {
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md h-[100vh] overflow-y-auto">
      <SheetHeader>
        <SheetTitle>User Cart</SheetTitle>
      </SheetHeader>
      <SheetDescription></SheetDescription>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartItemContent key={index} cartItems={item} />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total Amount</span>
          <span className="font-bold">{totalCartAmount}₹</span>
        </div>
        <Button className="w-full mt-5">CheckOut</Button>
      </div>
    </SheetContent>
  );
}
