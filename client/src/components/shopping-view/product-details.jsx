import React from 'react';
import { useLocation } from 'react-router-dom';

export default function ProductDetails() {
  const location = useLocation();
  const product = location.state;

  return (
    <div className="w-full min-h-screen p-0 m-0 bg-gray-50">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden h-full">

        {/* Image Section */}
        <div className="w-full lg:w-1/2 bg-gray-100 flex justify-center items-center">
          <img
            src={product?.image}
            alt={product?.title || 'Product'}
            className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-contain"
          />
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 lg:p-12 space-y-6">
          {/* Title */}
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-800">
            {product?.title || 'Product Title'}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base">
            {product?.description || 'Product description goes here.'}
          </p>

          {/* Ratings */}
          <div className="flex items-center space-x-2">
            <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
              ★ {product?.rating || '4.5'}
            </span>
            <span className="text-gray-500 text-sm">
              ({product?.ratingsCount || '120'} Ratings)
            </span>
          </div>

          {/* Price Section */}
          <div className="flex items-center space-x-4 text-lg sm:text-2xl font-semibold">
            <span className="text-green-600">₹{product?.salePrice || '399'}</span>
            <span className="line-through text-gray-500 text-base sm:text-xl">
              ₹{product?.price || '599'}
            </span>
            <span className="text-orange-500 text-sm sm:text-lg">
              50% OFF
            </span>
          </div>
          
          <div className='w-[200px] h-[40px]'>

        </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
            <button className="w-full sm:w-1/2 bg-red-500 hover:bg-red-600 text-white py-2 sm:py-3 rounded-md shadow-md">
              ADD TO CART
            </button>
            <button className="w-full sm:w-1/2 border border-gray-300 hover:bg-gray-100 text-gray-600 py-2 sm:py-3 rounded-md">
              ♥ WISHLIST
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
