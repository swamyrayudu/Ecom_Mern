import React from "react";
import { Card, CardContent } from "../ui/card";
import { Edit2, Trash2 } from "lucide-react";

export default function AddressCard({ addressInfo, handledeleteaddress,handleeditaddress }) {
  return (
    <Card className="shadow-lg border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl transition-shadow bg-gradient-to-r from-white to-blue-50">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-blue-800">Address Details</h3>
          </div>
          <div className="grid grid-cols-1 gap-3 text-sm text-gray-800">
            <div className="flex items-center">
              <span className="font-semibold w-24">Address:</span>
              <span>{addressInfo?.address}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-24">Pincode:</span>
              <span>{addressInfo?.pincode}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-24">City:</span>
              <span>{addressInfo?.city}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-24">Phone:</span>
              <span>{addressInfo?.phone}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-24">Notes:</span>
              <span>{addressInfo?.notes}</span>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-4 pt-4 flex justify-end space-x-3">
            <button onClick={() => handleeditaddress(addressInfo)} className="flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
              <Edit2 size={16} className="mr-2" /> Edit
            </button>
            <button
              onClick={() => handledeleteaddress(addressInfo)}
              className="flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
            >
              <Trash2 size={16}  className="mr-2" /> Delete
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
