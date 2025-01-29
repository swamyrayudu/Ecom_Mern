import React from "react";
import { Card, CardContent } from "../ui/card";
import { Edit2, Trash2 } from "lucide-react";

export default function AddressCard({ addressInfo, handledeleteaddress, handleeditaddress }) {
  return (
    <Card className="shadow-sm border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white">
      <CardContent className="p-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Address Details</h3>
          </div>
          <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
            <div className="flex items-center">
              <span className="font-medium w-24 text-gray-600">Address:</span>
              <span className="text-gray-800">{addressInfo?.address}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-24 text-gray-600">Pincode:</span>
              <span className="text-gray-800">{addressInfo?.pincode}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-24 text-gray-600">City:</span>
              <span className="text-gray-800">{addressInfo?.city}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-24 text-gray-600">Phone:</span>
              <span className="text-gray-800">{addressInfo?.phone}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-24 text-gray-600">Notes:</span>
              <span className="text-gray-800">{addressInfo?.notes}</span>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-4 pt-4 flex justify-end space-x-2">
            <button
              onClick={() => handleeditaddress(addressInfo)}
              className="flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-transparent hover:bg-blue-50 rounded-md transition-colors"
            >
              <Edit2 size={16} className="mr-2" /> Edit
            </button>
            <button
              onClick={() => handledeleteaddress(addressInfo)}
              className="flex items-center px-3 py-1.5 text-sm font-medium text-red-600 bg-transparent hover:bg-red-50 rounded-md transition-colors"
            >
              <Trash2 size={16} className="mr-2" /> Delete
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}