import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import AdminOrderDeatails from "./order-details";
import { Dialog } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { getallordersAdmin, getOrderDetailsAdmin, restorderDetails } from "@/store/orderSliceAdmin";
import { Badge } from "../ui/badge";


export default function AdminOdersView() {
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const [opendia, setopendia] = useState(false);
  const dispatch = useDispatch();
  function handlefetchorderdetails(getid) {
    dispatch(getOrderDetailsAdmin(getid));
  }

  useEffect(() => {
    dispatch(getallordersAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setopendia(true);
    }
  }, [orderDetails]);

  // console.log(orderDetails);
  return (
    <Card>
      <CardHeader>
        <CardTitle> All Orders </CardTitle>
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
                        : order?.orderStatus === "pending"
                        ? "bg-yellow-500"
                        : order?.orderStatus === "shipping"
                        ? "bg-blue-500"
                        : order?.orderStatus === "delivered"
                        ? "bg-green-500"
                        : order?.orderStatus === "rejected"
                        ? "bg-red-500"
                        : null
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
                      <AdminOrderDeatails orderDetails={orderDetails} />
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
