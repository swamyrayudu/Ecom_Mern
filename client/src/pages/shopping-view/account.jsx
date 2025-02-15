import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Orders from "@/components/shopping-view/orders";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";
import { useSelector } from "react-redux";

export default function ShoppingAccount() {

  return (
    <div className="flex flex-col">
      <div className=" relative h-[350px] w-full overflow-hidden">
        <img
          src="https://files.oaiusercontent.com/file-B411PKDg7pfwevzcZnvDKB?se=2025-02-14T09%3A42%3A39Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dc033a3f5-d261-4d64-85b4-75316ea05ade.webp&sig=hdZFuRmY6g/YQut%2Ba09RelQolMOAT6Bncm%2BuM/q/K8w%3D"
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
              <ShoppingOrders/>
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
