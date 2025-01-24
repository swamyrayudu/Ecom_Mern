import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../commen/form";
import { addressFormControls } from "../config";
const inisialAddressformdata = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  note: "",
};
export default function Address() {
  const [formdata, setformdata] = useState({ inisialAddressformdata });

  function handleaddressmanage(event){
    event.preventdefault()
  }
  function isFormValid() {
    return Object.keys(formdata)
      .map((key) => formdata[key] !== "")
      .every((item) => item);
  }
  return (
    <Card>
      <div>Address ALL List</div>
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
      </CardHeader>
      <CardContent className=" space-y-3">
        <CommonForm 
        formcontrols={addressFormControls}
        formdata={formdata}
        setformdata={setformdata}
        buttonText={'Add'}
        onSubmit={handleaddressmanage}
        isdiseble={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}
