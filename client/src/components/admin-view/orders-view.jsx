import React, { useState } from "react";
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

export default function AdminOdersView() {
  const [opendialog, setopendialog] = useState(false);
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
            <TableCell>123456</TableCell>
            <TableCell>27/12/2009</TableCell>
            <TableCell>rejected</TableCell>
            <TableCell>$2999</TableCell>
            <TableCell>
              <Dialog open={opendialog} onOpenChange={setopendialog}>
                <Button onClick={() => setopendialog(true)}>
                  View Details
                </Button>
                <AdminOrderDeatails />
              </Dialog>
            </TableCell>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
