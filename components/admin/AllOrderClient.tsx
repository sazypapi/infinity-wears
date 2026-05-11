"use client";
import { Prisma } from "@/generated/prisma";
import Link from "next/link";
import { useState } from "react";
import { formatCurrency, formatDateMonthAndYear } from "../../utils/format";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RxValueNone } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
type Order = Prisma.OrderGetPayload<{
  include: {
    orderItems: true;
  };
}> & {
  user: {
    firstName: string | null;
    lastName: string | null;
  };
};

const getDaysAgo = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
};

function AllOrderClient({ orders }: { orders: Order[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const shortText = (text: string) => text.slice(0, 10).toUpperCase();

  const filtered = orders.filter((order) => {
    const fullName =
      `${order.user?.firstName} ${order.user?.lastName}`.toLowerCase();
    const matchesSearch =
      !search ||
      fullName.includes(search.toLowerCase()) ||
      order.id.includes(search);

    const orderDate = new Date(order.createdAt);
    const matchesDate =
      !dateFilter ||
      (dateFilter === "7days" && orderDate >= getDaysAgo(7)) ||
      (dateFilter === "30days" && orderDate >= getDaysAgo(30)) ||
      (dateFilter === "90days" && orderDate >= getDaysAgo(90)) ||
      (dateFilter === "thisYear" &&
        orderDate.getFullYear() === new Date().getFullYear());

    const matchesStatus = !statusFilter || order.status === statusFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="w-full">
      {/* {DESKTOP FILTER} */}
      <div className="hidden sm:flex gap-2 mb-4">
        <input
          placeholder="search name or order ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 rounded-2xl px-2 py-1 text-xs border-neutral-500 text-black"
        />
        {/* {STATUS} */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="whitespace-nowrap text-xs px-2 bg-transparent border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
              Status
              <IoIosArrowDown />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-neutral-400">
                Choose Status
              </DropdownMenuLabel>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setStatusFilter("")}
              >
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setStatusFilter("pending")}
              >
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setStatusFilter("completed")}
              >
                Completed
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* {TIME FRAME} */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="whitespace-nowrap text-xs px-2 bg-transparent border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
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
        <button
          className="whitespace-nowrap text-xs px-2 bg-transparent border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700"
          onClick={() => {
            setDateFilter("");
            setSearch("");
            setStatusFilter("");
          }}
        >
          Clear Filters
        </button>
      </div>
      {/* {MOBILE FILTER} */}
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
              className="h-fit pt-10 pb-15 bg-black/30 backdrop-blur-md backdrop-saturate-150"
              showCloseButton={false}
            >
              <SheetTitle className="px-5 text-white">Filters</SheetTitle>
              <div className="grid grid-cols-2 gap-x-10 gap-y-5 mt-4 p-5">
                {/* STATUS */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-xs px-2 py-2 bg-transparent border-2 border-white rounded-2xl text-white flex justify-between items-center w-full active:scale-95 active:bg-white/10 transition duration-150">
                      Status <IoIosArrowDown />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs text-neutral-400">
                        Choose Status
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        className="capitalize text-black active:bg-neutral-100 transition duration-150"
                        onClick={() => setStatusFilter("")}
                      >
                        All Status
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="capitalize text-black active:bg-neutral-100 transition duration-150"
                        onClick={() => setStatusFilter("pending")}
                      >
                        Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="capitalize text-black active:bg-neutral-100 transition duration-150"
                        onClick={() => setStatusFilter("completed")}
                      >
                        Completed
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
                {/* CLEAR */}
                <button
                  className="text-xs px-2 py-2 bg-transparent border-2 border-white rounded-2xl text-white col-span-2 active:scale-95 active:bg-white/10 transition duration-150"
                  onClick={() => {
                    setDateFilter("");
                    setSearch("");
                    setStatusFilter("");
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
            <EmptyTitle className="text-neutral-500">No Order Found</EmptyTitle>
            <EmptyDescription className="text-neutral-600">
              No order fits your filter
            </EmptyDescription>
            <EmptyContent className="flex-row justify-center gap-2">
              <Button
                className="bg-transparent text-black border-2 border-black hover:text-white hover:bg-black transition duration-500"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("");
                  setDateFilter("");
                }}
              >
                Clear Filters
              </Button>
            </EmptyContent>
          </EmptyHeader>
        </Empty>
      ) : (
        <>
          {/* Header row */}
          <div className="grid sm:grid-cols-6 grid-cols-4 justify-between items-center sm:py-3 p-2 gap-2 sm:px-2 rounded-2xl mb-3">
            <h6 className="text-xs text-neutral-700">Order Id</h6>
            <h6 className="text-xs text-neutral-700">Name</h6>
            <h6 className="text-xs text-neutral-700 hidden sm:inline">Date</h6>
            <h6 className="text-xs text-neutral-700">Price</h6>
            <h6 className="text-xs text-neutral-700 hidden sm:inline">
              No Items
            </h6>
            <h6 className="text-xs text-neutral-700">Order Status</h6>
          </div>

          {/* Orders list */}
          {filtered.map((order) => (
            <Link href={`/admin/order-details/${order.id}`} key={order.id}>
              <div className="grid sm:grid-cols-6 grid-cols-4 justify-between items-center bg-neutral-300 sm:py-3 p-2 sm:px-2 rounded-2xl mb-3 gap-2">
                <h6 className="truncate text-black text-xs sm:text-sm">
                  {shortText(order.id)}
                </h6>
                <h6 className="text-black text-xs sm:text-sm truncate">
                  {order.user?.firstName} {order.user?.lastName}
                </h6>
                <h6 className="hidden sm:inline text-black text-sm">
                  {formatDateMonthAndYear(order.createdAt)}
                </h6>
                <h6 className="text-black text-xs sm:text-sm truncate">
                  {formatCurrency(order.totalAmount)}
                </h6>
                <h6 className="text-black text-sm hidden sm:inline">
                  {order.orderItems.length}{" "}
                  {order.orderItems.length === 1 ? "item" : "items"}
                </h6>
                <h6 className="text-xs truncate text-black sm:text-sm">
                  {order.status}
                </h6>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
}

export default AllOrderClient;
