import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../commen/form";
import { addressFormControls } from "../config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteaddress,
  fetchalladdress,
  updateaddress,
} from "@/store/addressSlice";
import AddressCard from "./address-card";
import { useToast } from "@/hooks/use-toast";

const initialAddressFormData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};

export default function Address({setcurrentaddress}) {
  const [formdata, setFormData] = useState(initialAddressFormData);
  const [currentEditId, setCurrentEditId] = useState(null);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { user } = useSelector((state) => state.auth);
  const { AddressList } = useSelector((state) => state.shoppingAddress);


  // console.log(AddressList);
  const handleAddressManage = (event) => {
    event.preventDefault();
    if(AddressList.length >= 3 && currentEditId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can only have 3 addresses max!",
        variant: "destructive",
      });
      return;
    } 
    if (currentEditId !== null) {
      dispatch(
        updateaddress({
          userId: user?.id,
          addressId: currentEditId,
          formdata,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchalladdress(user?.id));
          setCurrentEditId(null);
          setFormData(initialAddressFormData);
          toast({
            title: "Address updated successfully!",
            status: "success",
          });
        }
      });
    } else {
      dispatch(
        addNewAddress({
          ...formdata,
          userId: user?.id,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchalladdress(user?.id));
          setFormData(initialAddressFormData);
          toast({
            title: "New address added successfully!",
            status: "success",
          });
        }
      });
    }
  };

  const handleEditAddress = (currentAddress) => {
    setCurrentEditId(currentAddress._id);
    setFormData({
      address: currentAddress?.address || "",
      city: currentAddress?.city || "",
      pincode: currentAddress?.pincode || "",
      phone: currentAddress?.phone || "",
      notes: currentAddress?.notes || "",
    });
  };

  const handleDeleteAddress = (currentAddress) => {
    dispatch(
      deleteaddress({ addressId: currentAddress._id, userId: user?.id })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Address deleted successfully!",
          status: "success",
        });
        dispatch(fetchalladdress(user?.id));
      }
    });
  };

  const isFormValid = () => {
    return Object.values(formdata).every((value) => value.trim() !== "");
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchalladdress(user?.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="p-6 space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            {currentEditId !== null ? "Edit Address" : "Add New Address"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CommonForm
            formcontrols={addressFormControls}
            formdata={formdata}
            setformdata={setFormData}
            buttonText={currentEditId !== null ? "Update" : "Add"}
            onSubmit={handleAddressManage}
            isdiseble={!isFormValid()}
          />
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Saved Addresses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {AddressList && AddressList.length > 0 ? (
            AddressList.map((address, index) => (
              <AddressCard
              setcurrentaddress={setcurrentaddress}
                key={address._id || index}
                addressInfo={address}
                handledeleteaddress={handleDeleteAddress}
                handleeditaddress={handleEditAddress}
              />
            ))
          ) : (
            <p className="text-gray-500">No addresses found.</p>
          )}
        </div>
      </div>
    </div>
  );
}