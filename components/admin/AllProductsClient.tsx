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
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Prisma } from "@/generated/prisma";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RxValueNone } from "react-icons/rx";
import { formatCurrency } from "../../utils/format";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";

type products = Prisma.ProductGetPayload<{
  include: {
    variants: true;
    collection: true;
  };
}>;
const getDaysAgo = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
};
function AllProductsClient({ products }: { products: products[] }) {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [numVariants, setNumVariants] = useState<number>(0);
  const [inStock, setinStock] = useState("");
  const [collection, setCollection] = useState("");

  const allCollections = [
    ...new Set(
      products
        .map((product) => product.collection?.name)
        .filter(Boolean) as string[],
    ),
  ];
  const filtered = products.filter((product) => {
    const lowerCaseName = product.name.toLowerCase();
    const matchesSearch =
      !search ||
      lowerCaseName.includes(search.toLowerCase()) ||
      product.id.includes(search);

    const productDate = new Date(product.createdAt);
    const matchesDate =
      !dateFilter ||
      (dateFilter === "7days" && productDate >= getDaysAgo(7)) ||
      (dateFilter === "30days" && productDate >= getDaysAgo(30)) ||
      (dateFilter === "90days" && productDate >= getDaysAgo(90)) ||
      (dateFilter === "thisYear" &&
        productDate.getFullYear() === new Date().getFullYear());
    const matchStock =
      !inStock ||
      (inStock === "in stock" &&
        product.variants.some((variant) => variant.inStock)) ||
      (inStock === "out of stock" &&
        !product.variants.some((variant) => variant.inStock)) ||
      (inStock === "low stock" &&
        product.quantity > 0 &&
        product.quantity <= 5);

    const matchesNumVariants =
      !numVariants ||
      (numVariants === 1 && product.variants.length === 1) ||
      (numVariants === 2 && product.variants.length === 2) ||
      (numVariants === 3 && product.variants.length === 3) ||
      (numVariants === 4 && product.variants.length === 4) ||
      //   5 is a placeholder for greater than 5
      (numVariants === 5 && product.variants.length >= 5);
    const matchCollection =
      !collection || collection === product.collection?.name;
    return (
      matchStock &&
      matchesDate &&
      matchesSearch &&
      matchesNumVariants &&
      matchCollection
    );
  });

  return (
    <div className="w-full">
      {/* {DESKTOP FILTERS} */}
      <div className="hidden sm:flex gap-2 mb-4">
        <input
          placeholder="search name or order ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 rounded-2xl px-2 py-1 text-xs border-neutral-500 text-black"
        />
        {/* STOCK STATUS */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-xs px-2 bg-transparent border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
              Stock
              <IoIosArrowDown />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-neutral-400">
                Stock Status
              </DropdownMenuLabel>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setinStock("")}
              >
                All
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setinStock("in stock")}
              >
                In Stock
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setinStock("out of stock")}
              >
                Out of Stock
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setinStock("low stock")}
              >
                Low Stock
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* TIME FRAME */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-xs px-2 bg-transparent border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
              Time Frame
              <IoIosArrowDown />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-neutral-400">
                Choose Time Frame
              </DropdownMenuLabel>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setDateFilter("")}
              >
                All Time
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setDateFilter("7days")}
              >
                Last 7 days
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setDateFilter("30days")}
              >
                Last 30 Days
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setDateFilter("90days")}
              >
                Last 90 Days
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setDateFilter("thisYear")}
              >
                This Year
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* NUM VARIANTS */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-xs px-2 bg-transparent border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
              Variants
              <IoIosArrowDown />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-neutral-400">
                Choose Number of variants
              </DropdownMenuLabel>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setNumVariants(0)}
              >
                All
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setNumVariants(1)}
              >
                1
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setNumVariants(2)}
              >
                2
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setNumVariants(3)}
              >
                3
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setNumVariants(4)}
              >
                4
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setNumVariants(5)}
              >
                5 +
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* COLLECTION */}
        {allCollections.length === 0 ? (
          ""
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-xs px-2 bg-transparent border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
                Collection
                <IoIosArrowDown />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-neutral-400">
                  Choose Collection
                </DropdownMenuLabel>
                <DropdownMenuItem
                  className="capitalize text-black"
                  onClick={() => setCollection("")}
                >
                  All
                </DropdownMenuItem>
                {allCollections.map((collection) => {
                  return (
                    <DropdownMenuItem
                      key={collection}
                      className="capitalize text-black"
                      onClick={() => setCollection(collection!)}
                    >
                      {collection}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <button
          className="text-xs px-2 bg-transparent border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700"
          onClick={() => {
            setCollection("");
            setDateFilter("");
            setNumVariants(0);
            setSearch("");
            setinStock("");
          }}
        >
          Clear Filters
        </button>
      </div>
      {/* {MOBILE FILTERS} */}
      <div className="sm:hidden grid grid-cols-3 px-2 items-center gap-2 mb-4">
        <input
          placeholder="search name or order ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="focus:outline-none focus:ring-0 border-2 col-span-2 rounded-2xl px-2 py-1 text-[16px] border-neutral-500 text-black flex-1"
        />
        <div className="col-span-1">
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex items-center gap-1 text-[16px] px-2 py-1 border-2 border-neutral-500 rounded-2xl text-neutral-500 whitespace-nowrap active:scale-95 active:opacity-70 transition duration-150">
                <SlidersHorizontal className="h-3 w-3" />
                Filters
              </button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="h-fit pt-10 pb-15  bg-black/30 backdrop-blur-md backdrop-saturate-150"
              showCloseButton={false}
            >
              <SheetTitle className="px-5 text-white">Filters</SheetTitle>
              <div className="grid grid-cols-2 gap-x-10 gap-y-5 mt-4 p-5">
                {/* STOCK STATUS */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-xs px-2 py-2 bg-transparent border-2 border-white rounded-2xl text-white flex justify-between items-center w-full active:scale-95 active:bg-white/10 transition duration-150">
                      Stock <IoIosArrowDown />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs text-neutral-400">
                        Stock Status
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        className="capitalize text-black active:bg-neutral-100 transition duration-150"
                        onClick={() => setinStock("")}
                      >
                        All
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="capitalize text-black active:bg-neutral-100 transition duration-150"
                        onClick={() => setinStock("in stock")}
                      >
                        In Stock
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="capitalize text-black active:bg-neutral-100 transition duration-150"
                        onClick={() => setinStock("out of stock")}
                      >
                        Out of Stock
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="capitalize text-black active:bg-neutral-100 transition duration-150"
                        onClick={() => setinStock("low stock")}
                      >
                        Low Stock
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* TIME FRAME */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-xs px-2 py-2 bg-transparent border-2 border-white rounded-2xl text-white flex justify-between items-center w-full active:scale-95 active:bg-white/10 transition duration-150">
                      Time Frame <IoIosArrowDown />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs text-neutral-400">
                        Choose Time Frame
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        className="capitalize text-black active:bg-neutral-100 transition duration-150"
                        onClick={() => setDateFilter("")}
                      >
                        All Time
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="capitalize text-black active:bg-neutral-100 transition duration-150"
                        onClick={() => setDateFilter("7days")}
                      >
                        Last 7 days
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="capitalize text-black active:bg-neutral-100 transition duration-150"
                        onClick={() => setDateFilter("30days")}
                      >
                        Last 30 Days
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="capitalize text-black active:bg-neutral-100 transition duration-150"
                        onClick={() => setDateFilter("90days")}
                      >
                        Last 90 Days
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="capitalize text-black active:bg-neutral-100 transition duration-150"
                        onClick={() => setDateFilter("thisYear")}
                      >
                        This Year
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* NUM VARIANTS */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-xs px-2 py-2 bg-transparent border-2 border-white rounded-2xl text-white flex justify-between items-center w-full active:scale-95 active:bg-white/10 transition duration-150">
                      Variants <IoIosArrowDown />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs text-neutral-400">
                        Number of Variants
                      </DropdownMenuLabel>
                      {[0, 1, 2, 3, 4].map((n) => (
                        <DropdownMenuItem
                          key={n}
                          className="capitalize text-black active:bg-neutral-100 transition duration-150"
                          onClick={() => setNumVariants(n)}
                        >
                          {n === 0 ? "All" : n}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem
                        className="capitalize text-black active:bg-neutral-100 transition duration-150"
                        onClick={() => setNumVariants(5)}
                      >
                        5+
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* COLLECTION */}
                {allCollections.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-xs px-2 py-2 bg-transparent border-2 border-white rounded-2xl text-white flex justify-between items-center w-full active:scale-95 active:bg-white/10 transition duration-150">
                        Collection <IoIosArrowDown />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-xs text-neutral-400">
                          Choose Collection
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                          className="capitalize text-black active:bg-neutral-100 transition duration-150"
                          onClick={() => setCollection("")}
                        >
                          All
                        </DropdownMenuItem>
                        {allCollections.map((collection) => (
                          <DropdownMenuItem
                            key={collection}
                            className="capitalize text-black active:bg-neutral-100 transition duration-150"
                            onClick={() => setCollection(collection!)}
                          >
                            {collection}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                {/* CLEAR */}
                <button
                  className="text-xs px-2 py-2 bg-transparent border-2 border-white rounded-2xl text-white col-span-2 active:scale-95 active:bg-white/10 transition duration-150"
                  onClick={() => {
                    setCollection("");
                    setDateFilter("");
                    setNumVariants(0);
                    setSearch("");
                    setinStock("");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {filtered.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <RxValueNone />
            </EmptyMedia>
            <EmptyTitle className="text-neutral-500">
              No Product Found
            </EmptyTitle>
            <EmptyDescription className="text-neutral-600">
              No product fits your filter
            </EmptyDescription>
            <EmptyContent className="flex-row justify-center gap-2">
              <Button
                className="bg-transparent text-black border-2 border-black hover:text-white hover:bg-black transition duration-500"
                onClick={() => {
                  setCollection("");
                  setDateFilter("");
                  setNumVariants(0);
                  setSearch("");
                  setinStock("");
                }}
              >
                Clear Filters
              </Button>
            </EmptyContent>
          </EmptyHeader>
        </Empty>
      ) : (
        <>
          {filtered.map((product) => {
            return (
              <div
                className="flex flex-row justify-between align-middle items-center bg-neutral-300 sm:py-3 p-2 sm:px-2 rounded-2xl mb-3"
                key={product.id}
              >
                <div className="sm:w-16 sm:h-16 h-12 w-12 relative">
                  <Image
                    src={product.variants[0].coverImage}
                    fill
                    className="object-cover shadow-lg rounded-lg border"
                    alt={product.name}
                  />
                </div>
                <h2 className="text-gray-800 sm:text-sm text-xs w-40 sm:w-60 text-left">
                  {product.name}
                </h2>
                <h2 className="text-gray-800 text-sm hidden sm:inline-block w-30 text-left">
                  {formatCurrency(product.variants[0].price)}
                </h2>
                {product.quantity > 0 ? (
                  <h2 className="text-gray-800 text-sm hidden sm:inline-block text-left w-35">
                    {product.quantity} remaining
                  </h2>
                ) : (
                  <h2 className="w-30 text-left">None available</h2>
                )}
                <Button
                  asChild
                  variant="link"
                  className="text-neutral-950 bg-transparent p-1 sm:border-black sm:border-2 sm:hover:bg-black sm:hover:text-white sm:transition sm:duration-500 underline sm:no-underline underline-offset-3"
                >
                  <Link
                    className="text-xs"
                    href={`/admin/view-product/${product.slug}`}
                  >
                    View Product
                  </Link>
                </Button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default AllProductsClient;
