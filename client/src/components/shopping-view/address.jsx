import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../commen/form";
import { addressFormControls } from "../config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteaddress,
  fetchalladdress,
} from "@/store/addressSlice";
import AddressCard from "./address-card";

const inisialAddressformdata = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};

export default function Address() {
  const [formdata, setformdata] = useState(inisialAddressformdata);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { AddressList } = useSelector((state) => state.shoppingAddress);

  function handleaddressmanage(event) {
    event.preventDefault();
    dispatch(
      addNewAddress({
        ...formdata,
        userId: user?.id,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchalladdress(user?.id));
        setformdata(inisialAddressformdata);
      }
    });
  }

  function handledeleteaddress(getcurentaddress) {
    console.log(getcurentaddress);
    dispatch(
      deleteaddress({ userId: getcurentaddress.userId, addressId: getcurentaddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchalladdress(user?.id));
      }
    });
  }

  function isFormValid() {
    return Object.keys(formdata)
      .map((key) => formdata[key].trim() !== "")
      .every((item) => item);
  }

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
            Add New Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CommonForm
            formcontrols={addressFormControls}
            formdata={formdata}
            setformdata={setformdata}
            buttonText={"Add"}
            onSubmit={handleaddressmanage}
            isdiseble={!isFormValid()}
          />
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Saved Addresses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {AddressList && AddressList.length > 0 ? (
            AddressList.map((addresslist, index) => (
              <AddressCard
                key={index}
                addressInfo={addresslist}
                handledeleteaddress={handledeleteaddress}
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
