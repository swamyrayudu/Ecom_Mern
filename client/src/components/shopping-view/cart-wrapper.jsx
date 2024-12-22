import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import CartItemContent from "./cart-items-content";

export default function CartWrapper({ cartItems }) {
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>User Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {
          cartItems && cartItems.length > 0 
            ? cartItems.map((item, index) => (
                <CartItemContent key={index} cartItems={item} />
              )) 
            : <p>Your cart is empty.</p>
        }
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total Amount</span>
          <span className="font-bold">1000₹</span>
        </div>
        <Button className="w-full mt-5">CheckOut</Button>
      </div>
    </SheetContent>
  );
}
