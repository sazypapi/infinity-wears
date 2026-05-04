"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiMenu5Fill } from "react-icons/ri";
import Link from "next/link";
import { Prisma } from "@/generated/prisma";

type collectionLinks = Prisma.CollectionLinkGetPayload<{
  include: {
    collection: true;
  };
}>;
function Menu({
  collectionLinks = [],
}: {
  collectionLinks: collectionLinks[];
}) {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex align-middle items-center border-none focus:outline-none">
          <RiMenu5Fill className="w-8 h-8 text-white" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" alignOffset={0} className="w-40">
        {links.map((link) => {
          return (
            <DropdownMenuItem key={link.href}>
              <Link href={link.href} className="capitalize w-full">
                {link.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Menu;
