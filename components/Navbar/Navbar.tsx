"use client";
import Logo from "./Logo";
import Links from "./Links";
import UserIcon from "./UserIcon";
import Link from "next/link";
import Menu from "./Menu";
import { FiShoppingCart } from "react-icons/fi";
import NavSearch from "./NavSearch";
import { Suspense } from "react";
import { Prisma } from "@/generated/prisma";
type collectionLinks = Prisma.CollectionLinkGetPayload<{
  include: {
    collection: true;
  };
}>;
type product = Prisma.ProductGetPayload<{
  include: {
    collection: true;
    variants: true;
  };
}>;
function Navbar({
  collectionLinks,
  isAdmin,
  products,
}: {
  collectionLinks: collectionLinks[];
  isAdmin: boolean;
  products: product[];
}) {
  return (
    <>
      {/* MOBILE NAVBAR */}
      <nav className="lg:hidden bg-black shadow-lg h-17 flex items-center px-5">
        <div className="flex w-full items-center justify-between">
          <Logo />

          <div className="flex items-center gap-5">
            <Menu collectionLinks={collectionLinks} />
          </div>
        </div>
      </nav>

      {/* DESKTOP NAVBAR */}
      <nav className="hidden lg:flex justify-center w-full items-center h-20 bg-black">
        <div className="flex justify-between w-full gap-30 items-center px-10 h-20 text-white">
          <div className="basis-1/7">
            <Logo />
          </div>

          <div className="flex px-5 gap-5 items-center basis-3/7">
            <Links collectionLinks={collectionLinks} products={products} />
          </div>

          <div className="flex gap-15 justify-end items-center basis-2/7">
            <UserIcon isAdmin={isAdmin} />

            <Suspense>
              <NavSearch />
            </Suspense>

            <Link href="/cart">
              <FiShoppingCart className="w-6 h-6 text-white" />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
