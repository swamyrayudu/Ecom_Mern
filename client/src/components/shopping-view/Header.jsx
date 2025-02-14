import {
  CircleUser,
  LogOut,
  Menu,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Label } from "../ui/label";

export default function ShoppingHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingcart);

  const dispatch = useDispatch();
  const [openCart, setOpenCart] = useState(false);
  // const navigate = useNavigate();

  function MenuItems() {
    return (
      <nav className="flex flex-col lg:flex-row lg:items-center gap-8">
        {shoppingViewHeaderMenuItems.map((menuItem) => (
          <Link
            to={menuItem.path}
            key={menuItem.id}
            className="text-base font-semibold cursor-pointer hover:text-red-600 transition-colors"
          >
            {menuItem.label}
          </Link>
        ))}
      </nav>
    );
  }

  function handelLogOut() {
    dispatch(Logoutuser());
  }

  useEffect(() => {
    dispatch(fetchcartItems(user.id));
  }, [dispatch]);

  function Rightside() {
    return (
      <div className="flex lg:items-center lg:flex-row flex-col gap-6">
        <Sheet open={openCart} onOpenChange={() => setOpenCart(false)}>
          <Button
            onClick={() => setOpenCart(true)}
            variant="outline"
            size="icon"
            className="relative hover:bg-gray-100 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems?.items?.length || 0}
            </span>
            <span className="sr-only">User Cart</span>
          </Button>
          <CartWrapper
            setOpenCart={setOpenCart}
            cartItems={
              cartItems && cartItems.items && cartItems.items.length > 0
                ? cartItems.items
                : []
            }
          />
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="bg-gray-800">
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
              <Link to="profile">Profile</Link>
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
    <div className="w-full h-[70px] bg-white flex items-center justify-between px-8 shadow-md border-b border-gray-300">
      <div className="flex items-center">
        <Link to="/shopping/home" className="flex items-center space-x-3">
          <ShoppingBag className="w-7 h-7 text-red-600" />
          <span className="text-black font-bold text-xl">ShopEase</span>
        </Link>
      </div>

      <div className="hidden lg:flex lg:ml-auto">
        <MenuItems />
      </div>

      <Sheet>
        <SheetDescription></SheetDescription>
        <SheetTrigger asChild>
          <Button className="lg:hidden w-12 h-12 rounded-md">
            <Menu className="w-6 h-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="bg-white w-full max-w-xs">
          <SheetHeader>
            <SheetTitle className="text-black text-xl font-semibold">
              Menu
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <MenuItems />
            <Rightside />
          </div>
        </SheetContent>
      </Sheet>

      {isAuthenticated && (
        <div className="hidden lg:block text-gray-800 ml-6">
          <Rightside />
        </div>
      )}
    </div>
  );
}
