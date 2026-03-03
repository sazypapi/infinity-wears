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
    <nav className="border-b bg-black shadow-lg h-17 lg:h-0  flex justify-center w-full items-center">
      <Containers
        className="flex flex-row align-middle justify-between lg:top-[1vh]  lg:fixed w-full px-5 py-4 lg:h-15
     items-center
        lg:bg-black/50 lg:backdrop-blur-md lg:backdrop-saturate-150
        lg:border-t
        shadow-lg
        lg:text-white lg:rounded-4xl lg:z-30"
      >
        <div className="flex align-middle items-center">
          <Logo />
        </div>
        <div className="flex align-middle items-center lg:hidden">
          <Menu />
        </div>
        <div className="hidden lg:flex flex-row gap-5 align-middle items-center">
          <Links />
        </div>
        <div className="hidden lg:flex flex-row gap-10 align-middle items-center">
          <UserIcon />
          <Link href="/">
            <IoMdSearch className="w-7 h-7 text-white" />
          </Link>
          <Link href="/cart">
            <FiShoppingCart className="w-6 h-6 text-white" />
          </Link>
        </div>
      </Containers>
    </nav>
  );
}

export default Navbar;
