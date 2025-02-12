import React, { useState } from "react";
import { Label } from "../ui/label";
import { DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import CommonForm from "../commen/form";


const initailformdata = {
  status: "",
};

export default function AdminOrderDeatails({ orderDetails }) {
  const [formdata, setfordata] = useState(initailformdata);
  const { user } = useSelector((state) => state.auth);

  function handleupadatastatus(event) {
    event.preventDefault();
  }
  return (
    <>
      <DialogTitle></DialogTitle>
      <DialogDescription></DialogDescription>
      <DialogContent className=" sm:max-w-[600px]">
        <div className=" grid gap-6">
          <div className=" grid gap-2">
            <div className=" flex mt-6 items-center justify-between">
              <p className=" font-medium"> Order Id</p>
              <Label>{orderDetails?._id}</Label>
            </div>

            <div className=" flex mt-2 items-center justify-between">
              <p className=" font-medium"> Order Date</p>
              <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
            </div>
            <div className=" flex mt-2 items-center justify-between">
              <p className=" font-medium">paymentMethod</p>
              <Label>{orderDetails?.paymentMethod}</Label>
            </div>
            <div className=" flex mt-2 items-center justify-between">
              <p className=" font-medium">paymentStatus</p>
              <Label>{orderDetails?.paymentStatus}</Label>
            </div>

            <div className=" flex mt-2 items-center justify-between">
              <p className=" font-medium"> Order Price</p>
              <Label>${orderDetails?.totalAmount}</Label>
            </div>

            <div className=" flex mt-2 items-center justify-between">
              <p className=" font-medium"> Order Status</p>
              <Label>
                <Badge
                  className={`py-1 px-3 ${
                    orderDetails?.orderStatus === "confirmed"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {orderDetails?.orderStatus}
                </Badge>
              </Label>
            </div>
          </div>

          <Separator />

          <div className=" grid gap-4">
            <div className=" grid gap-2">
              <div className=" font-medium">Order Details</div>
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? (
                orderDetails?.cartItems.map((item, index) => (
                  <ul key={index} className=" grid gap-3">
                    <li className=" flex items-center justify-between">
                      <span>Product Name : {item.title}</span>
                      <span>quantity : {item.quantity}</span>
                      <span>$ {item.price}</span>
                    </li>
                  </ul>
                ))
              ) : (
                <div className="text-muted-foreground">No items found.</div>
              )}
            </div>
          </div>

          <div className=" grid gap-4">
            <div className=" grid gap-2">
              <div className=" font-medium">Shipping Info</div>
              <div className="grid gap-0.5 text-muted-foreground">
                <span>{user?.username}</span>
                <span>{orderDetails?.addressDetails?.address}</span>
                <span>{orderDetails?.addressDetails?.city}</span>
                <span>{orderDetails?.addressDetails?.pincode}</span>
                <span>{orderDetails?.addressDetails?.phone}</span>
                <span>{orderDetails?.addressDetails?.notes}</span>
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
                    buttonText={"Updata order Status"}
                    onSubmit={handleupadatastatus}
                  />
                </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </>
  );
}
