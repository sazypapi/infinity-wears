"use client";
import { RiShoppingCart2Line } from "react-icons/ri";
import UserIcon from "../Navbar/UserIcon";
import Link from "next/link";
import { IoMdSearch } from "react-icons/io";
import { ShoppingBag } from "lucide-react";

function BottomNav({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div className="flex justify-center w-full items-center z-999 pointer-events-auto">
      <div className="fixed bottom-2 w-[90%] sm:w-[50%] px-5 py-4 h-15 flex justify-between items-center bg-black/30 backdrop-blur-md backdrop-saturate-150 shadow-lg text-white rounded-4xl">
        <Link href="/shop">
          <ShoppingBag className="h-9 w-9 text-white" />
        </Link>
        <Link href="/search">
          <IoMdSearch className="h-9 w-9 text-white" />
        </Link>

        <Link href="/cart">
          <RiShoppingCart2Line className="h-9 w-9 text-white" />
        </Link>
        <UserIcon isAdmin={isAdmin} />
      </div>
    </div>
  );
}

export default BottomNav;
