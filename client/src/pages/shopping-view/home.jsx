import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallfilteredproducts, fetchgetProductDeatails } from "@/store/shopslice/productSlice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { sortOptions } from "@/components/config";
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
import { addcart, fetchcartItems } from "@/store/shopslice/cartSlice";
import { useToast } from "@/hooks/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ShoppingHomePage() {


  return (
    <div>
      home
    </div>
  );
}
