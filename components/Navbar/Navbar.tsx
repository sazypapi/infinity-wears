import React from "react";
import Containers from "../global/Containers";
import Logo from "./Logo";
import Links from "./Links";
import UserIcon from "./UserIcon";
import Link from "next/link";
import { IoMdSearch } from "react-icons/io";
import Menu from "./Menu";

function Navbar() {
  return (
    <nav className="border-b bg-black shadow-lg h-[10vh]">
      <Containers className="flex flex-row align-middle justify-between pt-4 pb-2">
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
        </div>
      </Containers>
    </nav>
  );
}

export default Navbar;
