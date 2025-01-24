import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className=" relative h-[350px] w-full overflow-hidden">
        <img
          src="https://github.com/sangammukherjee/mern-ecommerce-2024/blob/master/client/src/assets/account.jpg?raw=true"
          alt="image"
          className=""
        />
      </div>
      <div className=" container mx-auto grid grid-cols-1 gap-8 py-8">
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-md">
              <Tabs defaultValue="orders">
                  <TabsList>
                    <TabsTrigger value='orders'>Orders</TabsTrigger>
                    <TabsTrigger value='address'>Address</TabsTrigger>
                  </TabsList>
                  <TabsContent value='orders'>
                      
                  </TabsContent>
                  <TabsContent value='address'>

                  </TabsContent>
              </Tabs>
          </div>
      </div>
    </div>
  );
}
