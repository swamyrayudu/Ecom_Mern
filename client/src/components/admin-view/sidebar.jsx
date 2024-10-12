import {
  BadgeIndianRupee,
  ChartNoAxesCombined,
  ShoppingCart,
  TextSelect,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";

const MenucontrolItems = [
  {
    name: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <TextSelect />,
  },
  {
    name: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingCart />,
  },
  {
    name: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeIndianRupee />,
  },
];

function MenuItems({ setopen }) {
  const navigate = useNavigate();
  return (
    <>
      <nav className="mt-8 flex-col flex gap-2">
        {MenucontrolItems.map((controler) => (
          <div
            key={controler.name}
            onClick={() => { 
              navigate(controler.path);
              if (setopen) setopen(false);
            }}
            className="flex bg- items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-wrap hover:bg-slate-100 hover:underline hover:transition-shadow"
          >
            {controler.icon}
            <span className=" cursor-pointer">{controler.label}</span>
          </div>
        ))}
      </nav>
    </>
  );
}
export default function AdminSideBar({ open, setopen }) {
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setopen}>
        <SheetContent side="left" className="w-64 bg-white">
          <SheetDescription></SheetDescription>
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-4">
                <ChartNoAxesCombined size={30} />
                <div className="text-2xl font-extrabold">Admin Panel</div>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setopen={setopen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className=" hidden w-64  flex-col border-r p-6 lg:flex">
        <div
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems setopen={setopen} />
      </aside>
    </Fragment>
  );
}
