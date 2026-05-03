"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Prisma } from "@/generated/prisma";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RxValueNone } from "react-icons/rx";
import Link from "next/link";
import EditCollectionName from "./EditCollectionName";
import DeleteCollection from "./DeleteCollection";
import CreateCollectionPopOver from "./CreateCollectionPopOver";

type Collection = Prisma.CollectionGetPayload<{
  include: { products: true };
}>;

function AllCollectionsClient({ collections }: { collections: Collection[] }) {
  const [search, setSearch] = useState("");
  const [productCount, setProductCount] = useState("");

  const clearFilters = () => {
    setSearch("");
    setProductCount("");
  };

  const filtered = collections.filter((collection) => {
    const matchesSearch =
      !search || collection.name.toLowerCase().includes(search.toLowerCase());

    const matchesProductCount =
      !productCount ||
      (productCount === "empty" && collection.products.length === 0) ||
      (productCount === "small" &&
        collection.products.length >= 1 &&
        collection.products.length <= 5) ||
      (productCount === "large" && collection.products.length > 5);

    return matchesSearch && matchesProductCount;
  });

  return (
    <div className="w-full">
      {/* DESKTOP FILTERS */}
      <div className="hidden sm:flex gap-2 mb-4 items-center">
        <CreateCollectionPopOver component="Collection" />
        <input
          placeholder="search collections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 rounded-2xl px-2 py-1 text-xs border-neutral-500 text-black"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-xs px-2 py-1 bg-transparent border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
              Products
              <IoIosArrowDown />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-neutral-400">
                Product Count
              </DropdownMenuLabel>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setProductCount("")}
              >
                All
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setProductCount("empty")}
              >
                Empty
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setProductCount("small")}
              >
                Small (1–5)
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setProductCount("large")}
              >
                Large (5+)
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <button
          className="text-xs px-2 py-1 bg-transparent border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>

      {/* MOBILE FILTERS */}
      <div className="sm:hidden overflow-hidden w-full">
        <ScrollArea className="w-full">
          <div className="flex gap-2 mb-4">
            <CreateCollectionPopOver component="Collection" />
            <input
              placeholder="search collections..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-2 rounded-2xl px-2 py-1 text-xs border-neutral-500 text-black"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="whitespace-nowrap text-xs px-2 bg-transparent border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
                  Products
                  <IoIosArrowDown />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs text-neutral-400">
                    Product Count
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    className="capitalize text-black"
                    onClick={() => setProductCount("")}
                  >
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="capitalize text-black"
                    onClick={() => setProductCount("empty")}
                  >
                    Empty
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="capitalize text-black"
                    onClick={() => setProductCount("small")}
                  >
                    Small (1–5)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="capitalize text-black"
                    onClick={() => setProductCount("large")}
                  >
                    Large (5+)
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              className="whitespace-nowrap text-xs px-2 bg-transparent border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* EMPTY STATE */}
      {filtered.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <RxValueNone />
            </EmptyMedia>
            <EmptyTitle className="text-neutral-500">
              No Collection Found
            </EmptyTitle>
            <EmptyDescription className="text-neutral-600">
              No collection fits your filter
            </EmptyDescription>
            <EmptyContent className="flex-row justify-center gap-2">
              <Button
                className="bg-transparent text-black border-2 border-black hover:text-white hover:bg-black transition duration-500"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </EmptyContent>
          </EmptyHeader>
        </Empty>
      ) : (
        <>
          {filtered.map((collection) => {
            const collectionLength = collection.products.length > 0;
            return (
              <div
                className="flex flex-row justify-between align-middle items-center bg-neutral-300 sm:py-3 p-2 sm:px-2 rounded-2xl mb-3"
                key={collection.id}
              >
                <h2 className="text-gray-800  text-xs sm:text-sm text-left capitalize w-25 sm:w-30">
                  {collection.name}
                </h2>
                <h2 className="text-gray-800 text-xs sm:text-sm hidden sm:inline-block w-50 text-left">
                  {collectionLength
                    ? `${collection.products.length} Product(s)`
                    : "No Product in Collection"}
                </h2>
                <Button
                  variant="link"
                  className="text-neutral-950 bg-transparent p-1 sm:border-black sm:border-2 sm:hover:bg-black sm:hover:text-white sm:transition sm:duration-500 underline sm:no-underline underline-offset-3"
                >
                  <Link
                    className="text-xs"
                    href={`/admin/view-collection-products/${collection.id}`}
                  >
                    View Products
                  </Link>
                </Button>
                <div className="flex flex-row sm:gap-3 gap-1 justify-between">
                  <EditCollectionName collection={collection} />
                  <DeleteCollection collection={collection} />
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default AllCollectionsClient;
