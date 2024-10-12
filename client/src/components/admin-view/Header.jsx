import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";

export default function Adminheader({ setopen }) {
  return (
    <header className="flex justify-between items-center bg-white px-4 py-3 border-b">
      <Button onClick={() => setopen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          className=" inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
          
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}
