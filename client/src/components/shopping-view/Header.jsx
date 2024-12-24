import {
  CircleUser,
  LogOut,
  Menu,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "../config";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Logoutuser } from "@/store/authSlice";
import CartWrapper from "./cart-wrapper";
import { fetchcartItems } from "@/store/shopslice/cartSlice";

export default function ShoppingHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingcart);

  const dispatch = useDispatch();
  const [openCart, setOpenCart] = useState(false);

  // Logout function
  function handelLogOut() {
    dispatch(Logoutuser());
  }

  // Fetch cart items when user is authenticated and user.id changes
  useEffect(() => {
      dispatch(fetchcartItems(user.id));
  }, [dispatch]); // Runs only when user.id changes
  // console.log(cartItems?.);

  // Menu items for the header
  function MenuItems() {
    return (
      <nav className="flex flex-col lg:flex-row lg:items-center gap-6">
        {shoppingViewHeaderMenuItems.map((menuItem) => (
          <Link
            key={menuItem.id}
            to={menuItem.path}
            className="text-gray-800 hover:text-red-600 text-sm font-medium transition-colors"
          >
            {menuItem.label}
          </Link>
        ))}
      </nav>
    );
  }

  // Right side content (Cart and user menu)
  function Rightside() {
    return (
      <div className="flex lg:items-center lg:flex-row flex-col gap-4">
        <Sheet open={openCart} onOpenChange={() => setOpenCart(false)}>
          <Button onClick={() => setOpenCart(true)} variant="outline" size="icon">
            <ShoppingCart className="w-6 h-6" />
            <span className="sr-only">User Cart</span>
          </Button>
          <CartWrapper
            cartItems={
              cartItems && cartItems.items && cartItems.items.length > 0
                ? cartItems.items
                : []
            }
          />
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="bg-black">
              <AvatarFallback className="bg-red-500 hover:bg-red-600 text-white font-extrabold">
                {user.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-56">
            <DropdownMenuLabel>Author Name {user.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-6 h-6 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <CircleUser className="w-6 h-6 mr-2" />
              <Link to="account">Account</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handelLogOut}>
              <LogOut className="w-6 h-6 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="w-full h-[65px] bg-white flex items-center justify-between px-6 shadow-sm border-b border-gray-200 ">
      {/* Ecommm Logo Section */}
      <div className="flex items-center">
        <Link to="/shopping/home" className="flex items-center space-x-2">
          <ShoppingBag className="w-6 h-6 text-red-600" />
          <span className="text-black font-bold text-lg">ShopEase</span>
        </Link>
      </div>

      {/* Menu for larger screens */}
      <div className="hidden lg:flex lg:ml-auto">
        <MenuItems />
      </div>

      {/* Mobile menu */}
      <Sheet>
        <SheetDescription></SheetDescription>
        <SheetTrigger asChild>
          <Button className="lg:hidden w-10 h-10 rounded-md">
            <Menu className="w-6 h-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        
        <SheetContent side="left" className="bg-white w-full max-w-xs">
          <SheetHeader>
            <SheetTitle className="text-black text-xl font-semibold">Menu</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <MenuItems />
            <Rightside />
          </div>
        </SheetContent>
      </Sheet>

      {/*larger screens only icon right */}
      {isAuthenticated && (
        <div className="hidden lg:block text-gray-800 ml-6">
          <Rightside />
        </div>
      )}
    </div>
  );
}
