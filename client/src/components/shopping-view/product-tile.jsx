import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ShoppingProductTile({
  product,
  handleProductCart,
  handleProductDetails,
}) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const navigateToDetails = (productId) => {
    navigate(`/shopping/details/${productId}`, { state: { product } });
  };

  const toggleLike = (e) => {
    e.stopPropagation(); // Prevents triggering the card click event
    setLiked(!liked);
  };

  return (
    <Card className="group cursor-pointer shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 relative">
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

          {/* Like Icon */}
          <div
            onClick={toggleLike}
            className={`absolute top-2 right-2 p-2 rounded-full transition-transform duration-300 ${
              liked ? "scale-125 text-red-500" : "text-gray-400 hover:scale-110"
            }`}
          >
            <Heart fill={liked ? "#ef4444" : "none"} strokeWidth={2} className="w-6 h-6" />
          </div>
        </div>

        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2 text-gray-800">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2 text-gray-600">
            <span className="text-sm">{product?.category}</span>
            <span className="text-sm">{product?.brand}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`text-lg font-semibold ${
                product?.salePrice > 0 ? "line-through text-gray-500" : "text-primary"
              }`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-lg font-semibold text-red-500">
                ${product?.salePrice}
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
