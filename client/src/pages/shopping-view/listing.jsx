import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchallfilteredproducts,
  fetchgetProductDeatails,
} from "@/store/shopslice/productSlice";
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
import { addcart, fetchcartItems } from "@/store/shopslice/cartSlice";
import { useToast } from "@/hooks/use-toast";

export default function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, isLoading } = useSelector((state) => state.shopproducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingcart);
  const { toast } = useToast();
  const [sort, setsort] = useState(null);
  const [filter, setfilter] = useState({});
  const [searchparam, setsearchparam] = useSearchParams({});

  function searchparamhelper(filterparams) {
    const queryparam = [];
    for (const [key, value] of Object.entries(filterparams)) {
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

  function handleFilter(sectionId, option) {
    let copyfilters = { ...filter };
    if (!copyfilters[sectionId]) {
      copyfilters[sectionId] = [option];
    } else {
      const index = copyfilters[sectionId].indexOf(option);
      if (index === -1) {
        copyfilters[sectionId].push(option);
      } else {
        copyfilters[sectionId].splice(index, 1);
      }
    }
    setfilter(copyfilters);
    sessionStorage.setItem("filter", JSON.stringify(copyfilters));
  }

  function handleProductDetails(productId) {
    dispatch(fetchgetProductDeatails(productId));
  }

  function handleProductCart(productId, getotalStock) {
 

    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === productId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(addcart({ userId: user?.id, productId, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchcartItems(user?.id));
          toast({
            title: "Product add to Cart",
            description: "You can view it in your cart.",
            status: "success",
          });
        }
      }
    );
  }

  useEffect(() => {
    if (filter !== null && sort !== null) {
      dispatch(
        fetchallfilteredproducts({ filterparams: filter, sortparams: sort })
      );
    }
  }, [dispatch, sort, filter]);

  useEffect(() => {
    setsort("price-lowtohigh");
    setfilter(JSON.parse(sessionStorage.getItem("filter")) || {});
  }, []);

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const query = searchparamhelper(filter);
      setsearchparam(new URLSearchParams(query));
    }
  }, [filter]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Load />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 p-6">
      <div className="shadow-md rounded-lg p-4 bg-white">
        <ShoppingFilter filter={filter} handleFilter={handleFilter} />
      </div>
      <div className="bg-white rounded-lg shadow-md w-full">
        <div className="p-4 border-b flex items-center justify-between bg-gray-50 rounded-t-lg">
          <h2 className="font-semibold text-xl text-red-500">All Products</h2>
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
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem key={item.id} value={item.id}>
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-4 p-4">
          {productList && productList.length > 0 ? (
            productList.map((product) => (
              <ShoppingProductTile
                key={product._id}
                product={product}
                handleProductDetails={handleProductDetails}
                handleProductCart={handleProductCart}
              />
            ))
          ) : (
            <div className="w-full flex justify-center items-center">
              No products available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
