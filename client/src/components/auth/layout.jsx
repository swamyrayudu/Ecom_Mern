import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full animate-fadeIn bg-black">
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12 animate-slideInLeft">
        <div className="max-w-md space-y-6 text-center text-white">
          <h1 className="text-5xl font-extrabold tracking-tight animate-zoomIn">
            Welcome to ECommerce Shopping
          </h1>
          <p className="text-lg animate-slideInUp">
            Discover the best products and deals. Sign in to start shopping!
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8 animate-slideInRight rounded-l-3xl shadow-lg">
        <Outlet />
      </div>
    </div>
  );
}
