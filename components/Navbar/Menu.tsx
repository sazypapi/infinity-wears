"use client";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RiMenu5Fill } from "react-icons/ri";
import Link from "next/link";
import { Prisma } from "@/generated/prisma";

type collectionLinks = Prisma.CollectionLinkGetPayload<{
  include: { collection: true };
}>;

function Menu({
  collectionLinks = [],
}: {
  collectionLinks: collectionLinks[];
}) {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Shop", href: "/shop" },
    ...(collectionLinks.length > 0
      ? [{ label: "Collections", href: "/collections" }]
      : []),
    { label: "Custom Order", href: "/create-customorder" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex align-middle items-center border-none focus:outline-none">
          <RiMenu5Fill className="w-8 h-8 text-white" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-black/30 pt-10 backdrop-blur-md backdrop-saturate-150 border-none focus:outline-none"
        showCloseButton={false}
      >
        {/* <SheetTitle className="text-white px-2 mb-6">Menu</SheetTitle> */}
        <div className="flex flex-col gap-4 px-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="capitalize text-white text-lg hover:text-neutral-300 active:text-neutral-400 active:scale-95 transition duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Menu;
