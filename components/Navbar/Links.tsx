"use client";
import Link from "next/link";
import CollectionsDropdown from "./CollectionsDropdown";
import { Prisma } from "@/generated/prisma";
type collectionLinks = Prisma.CollectionLinkGetPayload<{
  include: {
    collection: true;
  };
}>;
function Links({ collectionLinks }: { collectionLinks: collectionLinks[] }) {
  return (
    <div
      className={`flex gap-10 flex-row text-white items-center w-full ${collectionLinks.length > 0 ? `justify-around` : `justify-around`}`}
    >
      <Link
        href="/shop"
        className="relative text-xs after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-linear-to-r after:from-gray-600 after:to-white after:transition-all after:duration-300 hover:after:w-full"
      >
        SHOP
      </Link>
      <Link
        href="/about"
        className="relative text-xs after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-linear-to-r after:from-gray-600 after:to-white after:transition-all after:duration-300 hover:after:w-full"
      >
        ABOUT
      </Link>
      <Link
        href="/contact"
        className="relative text-xs after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-linear-to-r after:from-gray-600 after:to-white after:transition-all after:duration-300 hover:after:w-full"
      >
        CONTACT
      </Link>
      {collectionLinks.length > 0 && (
        <CollectionsDropdown collectionLinks={collectionLinks} />
      )}
    </div>
  );
}

export default Links;
