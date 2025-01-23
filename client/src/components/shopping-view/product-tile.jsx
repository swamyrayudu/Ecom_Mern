import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function ShoppingProductTile({
  product,
  handleProductCart,
  handleProductDetails,
}) {
  const navigate = useNavigate();

  const navigateToDetails = (productId) => {
    navigate(`/shopping/details/${productId}`, { state: { product } });
  };

  return (
    <Card className="group cursor-pointer shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <div onClick={() => navigateToDetails(product?._id)} className="cursor-pointer">
        <div className="relative">
          <img
            className="w-full h-[300px] object-cover"
            src={product?.image}
            alt={product?.title}
          />
          {product?.salePrice > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              Sale: {product?.totalStock}
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2 text-gray-800">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2 text-gray-600">
            <span className="text-sm">{product?.category}</span>
            <span className="text-sm">{product?.brand}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through text-gray-500" : "text-primary"
              } text-lg font-semibold`}
            >
              ₹{product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-lg font-semibold text-red-500">
                ₹{product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-4">
        <Button
          onClick={() => handleProductCart(product?._id)}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
