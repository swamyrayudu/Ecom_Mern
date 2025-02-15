import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { Logoutuser } from "@/store/authSlice";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { LiaFirstOrderAlt } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const MenucontrolItems = [
  {
    name: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <RxDashboard size={24} />,
  },
  {
    name: "products",
    label: "Products",
    path: "/admin/products",
    icon: <MdOutlineProductionQuantityLimits size={24} />,
  },
  {
    name: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <LiaFirstOrderAlt size={24} />,
  },
];

export default function Adminheader({ setopen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(Logoutuser());
  }

  return (
    <header className="flex justify-between items-center bg-white px-6 py-5 border-b shadow-md h-20">
      {/* Mobile Menu Button */}
      <Button onClick={() => setopen(true)} className="lg:hidden sm:block text-xl">
        <AlignJustify size={28} />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Navigation Menu */}
      <nav className="flex gap-6 text-lg font-semibold">
        {MenucontrolItems.map((controller) => (
          <div
            key={controller.name}
            onClick={() => navigate(controller.path)}
            className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-all px-4 py-2 rounded-lg"
          >
            {controller.icon}
            <span>{controller.label}</span>
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="flex flex-1 justify-end">
        <Button
          className="flex gap-3 items-center rounded-lg px-5 py-3 text-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-all shadow-lg"
          onClick={handleLogout}
        >
          <RiLogoutCircleRLine size={24} />
          Logout
        </Button>
      </div>
    </header>
  );
}
