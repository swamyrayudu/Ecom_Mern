import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";

export default function CartWrapper() {
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>User Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4"></div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
            <span className="font-bold">Totle Amount</span>
            <span className="font-bold">1000₹</span>

        </div>
        <Button className='w-full mt-5'>CheckOut</Button>
      </div>
    </SheetContent>
  );
}
