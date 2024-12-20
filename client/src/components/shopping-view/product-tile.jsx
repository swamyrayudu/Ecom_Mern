import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function ShoppingProductTile({ product, handleProductCart }) {
  const navigate = useNavigate();

  // Navigate to product details page
  const handleProductDetails = (productId) => {
    navigate(`/shopping/details/${productId}`, { state: { product } });
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div
        onClick={() => handleProductDetails(product?._id)}
        className="cursor-pointer"
      >
        <div className="relative">
          <img
            className="w-full h-[300px] object-cover rounded-t-lg"
            src={product?.image}
            alt={product?.title}
          />
          {product?.salePrice > 0 && (
            <Badge className="absolute top-2 left-2">
              Sale: {product?.totalStock}
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              {product?.category}
            </span>
            <span className="text-sm text-muted-foreground">
              {product?.brand}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ₹{product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-lg font-semibold text-primary">
                ₹{product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button
          onClick={() => handleProductCart(product?._id)}
          className="w-full bg-red-500 hover:bg-red-600 font-medium"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
