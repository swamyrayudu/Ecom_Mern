import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallfilteredproducts } from "@/store/shopslice/productSlice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { sortOptions } from "@/components/config";
import ShoppingFilter from "@/components/shopping-view/filter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ShoppingListing() {
  // Fetch list of products
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopproducts);

  useEffect(() => {
    dispatch(fetchallfilteredproducts());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 p-6">
      {/* Sidebar Filter */}
      <div className="shadow-md rounded-lg p-4 bg-white">
        <ShoppingFilter />
      </div>

      {/* Products Listing */}
      <div className="bg-white rounded-lg shadow-md w-full">
        {/* Header Section */}
        <div className="p-4 border-b flex items-center justify-between bg-gray-50 rounded-t-lg">
          <h2 className="font-semibold text-xl text-gray-800">All Products</h2>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="cursor-text bg-gray-100">
              10 Products
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-gray-100"
                >
                  <ArrowUpDownIcon className="w-4 h-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Products Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {productList && productList.length > 0 ? (
            productList.map((product) => (
              <ShoppingProductTile product={product} key={product._id} />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
