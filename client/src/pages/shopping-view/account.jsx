import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Orders from "@/components/shopping-view/orders";
import Address from "@/components/shopping-view/address";

export default function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className=" relative h-[350px] w-full overflow-hidden">
        <img
          src="https://github.com/sangammukherjee/mern-ecommerce-2024/blob/master/client/src/assets/account.jpg?raw=true"
          alt="image"
          className="h-full w-full object-cover oveject-center"
        />
      </div>
      <div className=" container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-md">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <Orders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
