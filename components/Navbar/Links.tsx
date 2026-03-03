"use client";
import Link from "next/link";
import CollectionsDropdown from "./CollectionsDropdown";

function Links() {
  return (
    <div className="flex gap-10 flex-row text-white justify-between items-center">
      <Link
        href="/shop"
        className="relative text-xs after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
      >
        SHOP
      </Link>
      <Link
        href="/about"
        className="relative text-xs after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
      >
        ABOUT
      </Link>
      <Link
        href="/contact"
        className="relative text-xs after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
      >
        CONTACT
      </Link>
      <CollectionsDropdown />
    </div>
  );
}

export default Links;
