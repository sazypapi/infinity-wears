"use client";
import { useState } from "react";
import { Prisma } from "@/generated/prisma";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

type CollectionLink = Prisma.CollectionLinkGetPayload<{
  include: { collection: true };
}>;

const genderLinks = [
  { label: "Male", href: "/collections/gender/male" },
  { label: "Female", href: "/collections/gender/female" },
  { label: "Unisex", href: "/collections/gender/unisex" },
];

function CollectionsDropdown({
  collectionLinks,
}: {
  collectionLinks: CollectionLink[];
}) {
  const [open, setOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);

  return (
    <div
      className="relative text-black"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setGenderOpen(false);
      }}>
      <button className="bg-black text-white text-xs px-3 py-2 flex items-center tracking-widest">
        COLLECTIONS
        <ChevronDown className="w-3 h-3" />
      </button>

      {open && (
        <>
          <div className="absolute top-full left-0 w-full h-2" />
          <div className="absolute top-[calc(100%+4px)] left-0 w-[200px] bg-white border border-gray-200 rounded-md py-1 z-50">
            {collectionLinks.map((link) => (
              <Link
                key={link.id}
                href={`/collections/${link.collection.slug}`}
                className="block px-4 py-2 text-xs capitalize hover:bg-gray-50">
                {link.collectionName}
              </Link>
            ))}
            <Link
              href={`/collections/new-in`}
              className="block px-4 py-2 text-xs capitalize hover:bg-gray-50">
              New In
            </Link>
            <Link
              href={`/collections/best-selling`}
              className="block px-4 py-2 text-xs capitalize hover:bg-gray-50">
              Best Selling
            </Link>
            <div className="border-t my-1" />

            <div
              className="relative"
              onMouseEnter={() => setGenderOpen(true)}
              onMouseLeave={() => setGenderOpen(false)}>
              <button className="w-full flex items-center justify-between px-4 py-2 text-xs hover:bg-gray-50">
                Gender
                <ChevronRight className="w-3 h-3" />
              </button>

              {genderOpen && (
                <>
                  <div className="absolute top-0 left-full w-2 h-full" />
                  <div className="absolute top-0 left-[calc(100%+4px)] w-[140px] bg-white border border-gray-200 rounded-md py-1 z-50">
                    {genderLinks.map((g) => (
                      <Link
                        key={g.label}
                        href={g.href}
                        className="block px-4 py-2 text-xs hover:bg-gray-50">
                        {g.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CollectionsDropdown;
