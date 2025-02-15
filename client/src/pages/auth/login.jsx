import CommonForm from "@/components/commen/form";
import { LoginFormcontrols } from "@/components/config";
import { useToast } from "@/hooks/use-toast";
import { loginAction } from "@/store/authSlice";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};
export default function Login() {
  const [formdata, setformdata] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();


  function isFormValid() {
    return Object.keys(formdata)
      .map((key) => formdata[key] !== "")
      .every((item) => item);
  }
  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginAction(formdata)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }
  return (
    <div className="mx-auto w-full mx-w-md">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tighter max-sm:text-xl">
          Sign to Your Account
        </h1>
        <p className="mt-2">
          You Don't have account?{" "}
          <Link to="/auth/register" className="font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formcontrols={LoginFormcontrols}
        buttonText={"Sign In"}
        formdata={formdata}
        setformdata={setformdata}
        onSubmit={onSubmit}
        isdiseble={!isFormValid()}
      />
    </div>
  );
}
