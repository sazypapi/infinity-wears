"use client";
import Link from "next/link";
import CollectionsDropdown from "../Navbar/CollectionsDropdown";

function FooterMidRange() {
  return (
    <div className="flex justify-center items-center gap-15 mb-4">
      <Link href="/" className="text-white">
        Home
      </Link>
      <Link href="/" className="text-white">
        About
      </Link>
      <Link href="/" className="text-white">
        Shop
      </Link>
      <CollectionsDropdown />
    </div>
  );
}

export default FooterMidRange;
