import React from "react";
import { BsShop } from "react-icons/bs";
import { RiShoppingCart2Line } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { LucideUser } from "lucide-react";
function BottomNav() {
  return (
    <div
      className="fixed bottom-[-1vh] w-full px-6 pt-4 pb-6 h-[9vh]
        flex justify-between items-center
        bg-black/30 backdrop-blur-md backdrop-saturate-150
        border-t border-white/20
        shadow-lg
        text-white"
    >
      <BsShop className="h-9 w-9  text-white" />
      <IoMdSearch className="h-9 w-9  text-white" />
      <RiShoppingCart2Line className="h-9 w-9  text-white" />
      <LucideUser className="h-9 w-9  bg-gray-600 text-white rounded-full" />
    </div>
  );
}

export default BottomNav;
