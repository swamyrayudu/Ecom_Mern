import React from "react";
import { Outlet } from "react-router-dom";
import image1 from "../../assets/img.jpg";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full animate-fadeIn">
      {/* Left Section with Background Image */}
      <div
        className="hidden lg:flex w-1/2 bg-black bg-cover bg-center animate-slideInLeft"
        style={{ backgroundImage: `url(${image1})` }}
      >
        <div className="w-full h-full bg-black/60 flex items-center justify-center px-12">
          <div className="max-w-md space-y-6 text-center text-white">
            <h1 className="text-5xl font-extrabold tracking-tight animate-zoomIn">
              Welcome to ECommerce Shopping
            </h1>
            <p className="text-lg animate-slideInUp">
              Discover the best products and deals. Sign in to start shopping!
            </p>
          </div>
        </div>
      </div>

      {/* Right Section for Authentication Forms */}
      <div className="flex flex-1 items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8 animate-slideInRight rounded-l-3xl shadow-lg">
        <Outlet />
      </div>
    </div>
  );
}
