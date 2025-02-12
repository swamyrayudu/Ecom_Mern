import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

export default function ProductTile({
  product,
  setformdata,
  setProducts,
  setcurrentId,
  handleDeleteProduct,
}) {
  return (
    <>
      <Card className="w-full max-w-sm mx-auto">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent className=" text-xl font-bold mb-2">
          <h2>{product?.title}</h2>
          <div className=" flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className=" text-lg font-bold">${product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className=" flex justify-between items-center">
          <Button
              onClick={() => {
              setProducts(true);
              setcurrentId(product._id);
              setformdata(product)
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDeleteProduct(product?._id)}>Delete</Button>
        </CardFooter>
      </Card>
    </>
  );
}
