import React, { useState } from "react";
import { Label } from "../ui/label";
import { DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import CommonForm from "../commen/form";

const initailformdata={
    status:''
}

export default function AdminOrderDeatails() {

    const [formdata,setfordata] = useState(initailformdata)
    function handleupadatastatus(event){
        event.preventDefault()
    }
  return (
    <DialogContent className=" sm:max-w-[600px]">
      <div className=" grid gap-6">
        <div className=" grid gap-2">
          <div className=" flex mt-6 items-center justify-between">
            <p className=" font-medium"> Order Id</p>
            <Label>12345</Label>
          </div>

          <div className=" flex mt-2 items-center justify-between">
            <p className=" font-medium"> Order Date</p>
            <Label>27/11/2006</Label>
          </div>

          <div className=" flex mt-2 items-center justify-between">
            <p className=" font-medium"> Order Price</p>
            <Label>$500</Label>
          </div>

          <div className=" flex mt-2 items-center justify-between">
            <p className=" font-medium"> Order Status</p>
            <Label>In process</Label>
          </div>
          <Separator />

          <div className=" grid gap-4">
            <div className=" grid gap-2">
              <div className=" font-medium">Order Details</div>
              <ul className=" grid gap-3">
                <li className=" flex items-center justify-between">
                  <span>Product Name</span>
                  <span>$100</span>
                </li>
              </ul>
            </div>
          </div>

          <div className=" grid gap-4">
            <div className=" grid gap-2">
              <div className=" font-medium">Shipping Info</div>
              <div className="grid gap-0.5 text-muted-foreground">
                <span>Swamy</span>
                <span>Address</span>
                <span>City</span>
                <span>pincode</span>
                <span>Phone</span>
                <span>Notes</span>
              </div>
              <div className="">
                <CommonForm
                formcontrols={[
                    {
                        label: "Order Status",
                        name: "Status",
                        componentType: "select",
                        options: [
                          { id: "processing", label: "Processing" },
                          { id: "pending", label: "Pending" },
                          { id: "rejected", label: "Rejected" },
                          { id: "shipping", label: "Shipping" },
                          { id: "delivered", label: "Delivered" },
                         
                        ],
                      },
                ]}
                formdata={formdata}
                setformdata={setfordata}
                buttonText={'Updata order Status'}
                onSubmit={handleupadatastatus}
                />
                </div>  

            </div> 

          </div>
        </div>
      </div>
    </DialogContent>
  );
}
