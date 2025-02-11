import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import ShoppingorderDetails from "./Shopping-orderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getallorders,
  getOrderDetails,
  restorderDetails,
} from "@/store/shopslice/orderSlice";
import { Badge } from "../ui/badge";

export default function ShoppingOrders() {
  const [opendia, setopendia] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector(
    (state) => state.shoppingorder
  );

  function handlefetchorderdetails(getid) {
    dispatch(getOrderDetails(getid));
  }

  useEffect(() => {
    dispatch(getallorders(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setopendia(true);
    }
  }, [orderDetails]);
  console.log(orderDetails);
  return (
    <Card>
      <CardHeader>
        <CardTitle> order histroy </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0 ? (
              orderList.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order?._id}</TableCell>
                  <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge
                      className={`py-1 px-3 ${
                        order?.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${order?.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog
                      open={opendia}
                      onOpenChange={() => {
                        setopendia(false);
                        dispatch(restorderDetails());
                      }}
                    >
                      <Button
                        onClick={() => handlefetchorderdetails(order._id)}
                      >
                        View Details
                      </Button>
                      <ShoppingorderDetails orderDetails={orderDetails} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
