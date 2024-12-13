import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";

export default function ShoppingProductTile({ product }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (

    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className=" relative">
          <img
            className="w-full h-[300px] object-cover rounded-t-lg cursor-pointer"
            src={product?.image}
            alt={product?.title}
            onClick={()=>{
              navigate(`/shopping/details/${product._id}`,{ state: product })
             
            }}
          />
          {product?.salePrice > 0 ? (
            <Badge className=" absolute top-2 left-2 ">
                sale :
                {
                    product?.totalStock
                }
            </Badge>
          ) : null}
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
              {product?.price}₹
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                {product?.salePrice} ₹
              </span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter>
            <Button className='w-full bg-red-500 hover:bg-red-600 font-medium'>Add Cart</Button>
        </CardFooter>
      </div>
    </Card>
  );
}
