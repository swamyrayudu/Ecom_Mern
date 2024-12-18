import React, { useEffect, useState } from "react";
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
import Load from "@/components/loading/load";
import { useSearchParams } from "react-router-dom";

export default function ShoppingListing() {
  // Fetch list of products

  const dispatch = useDispatch();
  const { productList, isLoading } = useSelector((state) => state.shopproducts);
  const [sort, setsort] = useState(null);
  const [filter, setfilter] = useState({});
  const [searchparam, setsearchparam] = useSearchParams({});

  // console.log(productList);
  function searchparamhelper(filterparems) {
    const queryparam = [];

    for (const [key, value] of Object.entries(filterparems)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramvalue = value.join(",");
        queryparam.push(`${key}=${encodeURIComponent(paramvalue)}`);
      }
    }
    return queryparam.join("&");
  }
  function handlesort(value) {
    setsort(value);
  }
  function handleFilter(getCurrentSectionId, getCurrentOption) {
    let copyfilters = { ...filter };
    const indexofcurrentSectionId =
      Object.keys(copyfilters).indexOf(getCurrentSectionId);

    if (indexofcurrentSectionId === -1) {
      copyfilters = {
        ...copyfilters,
        [getCurrentSectionId]: [getCurrentOption],
      };
    } else {
      const indexofcurrentOption =
        copyfilters[getCurrentSectionId].indexOf(getCurrentOption);
      if (indexofcurrentOption === -1) {
        copyfilters[getCurrentSectionId].push(getCurrentOption);
      } else {
        copyfilters[getCurrentSectionId].splice(indexofcurrentOption, 1);
      }
    }

    setfilter(copyfilters);
    sessionStorage.setItem("filter", JSON.stringify(copyfilters));
  }
  useEffect(() => {
    if (filter !== null && sort !== null)
      dispatch(
        fetchallfilteredproducts({ filterparams: filter, sortparams: sort })
      );
  }, [dispatch, sort, filter]);
  useEffect(() => {
    setsort("price-lowtohigh");
    setfilter(JSON.parse(sessionStorage.getItem("filter")) || {});
  }, []);
  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createSearchQuery = searchparamhelper(filter);
      setsearchparam(new URLSearchParams(createSearchQuery));
    }
  }, [filter]);
  // console.log(filter);
  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Load />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 p-6">
      {/* Sidebar Filter */}
      <div className="shadow-md rounded-lg p-4 bg-white">
        <ShoppingFilter filter={filter} handleFilter={handleFilter} />
      </div>

      {/* Products Listing */}
      <div className="bg-white rounded-lg shadow-md w-full">
        {/* Header Section */}
        <div className="p-4 border-b flex items-center justify-between bg-gray-50 rounded-t-lg">
          <h2 className="font-semibold text-xl text-gray-800">All Products</h2>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="cursor-text bg-gray-100">
              {productList?.length} Products
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
                <DropdownMenuRadioGroup value={sort} onValueChange={handlesort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                    >
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
            <div className="w-full h-screen flex justify-center items-center ml-[310px]">
              No products Availble
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
