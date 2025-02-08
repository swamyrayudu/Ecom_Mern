import React, { useState } from "react";
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

export default function ShoppingOrders() {
  const [opendia, setopendia] = useState(false);
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
            <TableRow>
              <TableCell>123456</TableCell>
              <TableCell>27/12/2009</TableCell>
              <TableCell>rejected</TableCell>
              <TableCell>$2999</TableCell>
              <TableCell>
                <Dialog open={opendia} onOpenChange={setopendia}>
                  <Button onClick={() => setopendia(true)}>View Details</Button>
                  <ShoppingorderDetails />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
