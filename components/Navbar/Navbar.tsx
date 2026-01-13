"use client";
import Containers from "../global/Containers";
import Logo from "./Logo";
import Links from "./Links";
import UserIcon from "./UserIcon";
import Link from "next/link";
import { IoMdSearch } from "react-icons/io";
import Menu from "./Menu";
import { FiShoppingCart } from "react-icons/fi";
function Navbar() {
  return (
    <nav className="border-b bg-black shadow-lg h-17 sm:h-0  flex justify-center w-[full] items-center">
      <Containers
        className="flex flex-row align-middle justify-between sm:top-[1vh]  sm:fixed  w-full px-5 py-4 sm:h-15
     items-center
        sm:bg-black/50 sm:backdrop-blur-md sm:backdrop-saturate-150
        sm:border-t
        shadow-lg
        sm:text-white sm:rounded-4xl sm:z-30"
      >
        <div className="flex align-middle items-center">
          <Logo />
        </div>
        <div className="flex align-middle items-center sm:hidden">
          <Menu />
        </div>
        <div className="hidden sm:flex flex-row gap-5 align-middle items-center">
          <Links />
        </div>
        <div className="hidden sm:flex flex-row gap-10 align-middle items-center">
          <UserIcon />
          <Link href="/">
            <IoMdSearch className="w-7 h-7 text-white" />
          </Link>
          <Link href="/">
            <FiShoppingCart className="w-6 h-6 text-white" />
          </Link>
        </div>
      </Containers>
    </nav>
  );
}

export default Navbar;
