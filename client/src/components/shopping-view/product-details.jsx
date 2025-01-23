import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchgetProductDeatails } from "@/store/shopslice/productSlice";
import { addcart, fetchcartItems } from "@/store/shopslice/cartSlice";
import Load from "../loading/load";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { toast } = useToast();
  const { productDetails: product, isLoading } = useSelector(
    (state) => state.shopproducts
  );
  const user = useSelector((state) => state.auth.user);

  const handleaddTocart = (productId) => {
    if (!user) {
      toast.error("Please log in to add items to the cart.");
      return;
    }

    dispatch(addcart({ userId: user.id, productId, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchcartItems(user.id));
          toast({
            title: "Product added to cart",
          });
        } else {
          toast({
            title: "Error adding product to cart",
          });
        }
      }
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchgetProductDeatails(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Load />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <span>No product details available.</span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-4 bg-gray-50">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden h-full">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 bg-gray-100 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title || "Product"}
            className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-contain"
          />
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 lg:p-12 space-y-6">
          {/* Title */}
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-800">
            {product.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base">
            {product.description}
          </p>

          {/* Ratings */}
          <div className="flex items-center space-x-2">
            <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
              ★ {product.rating || "4.5"}
            </span>
            <span className="text-gray-500 text-sm">
              ({product.ratingsCount || "120"} Ratings)
            </span>
          </div>

          {/* Price Section */}
          <div className="flex items-center space-x-4 text-lg sm:text-2xl font-semibold">
            <span className="text-green-600">₹{product.salePrice}</span>
            <span className="line-through text-gray-500 text-base sm:text-xl">
              ₹{product.price}
            </span>
            {product.salePrice && product.price && (
              <span className="text-orange-500 text-sm sm:text-lg">
                {Math.round(
                  ((product.price - product.salePrice) / product.price) * 100
                )}
                % OFF
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
            <button
              onClick={() => handleaddTocart(product._id)}
              className="w-full sm:w-1/2 bg-red-500 hover:bg-red-600 text-white py-2 sm:py-3 rounded-md shadow-md"
            >
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
