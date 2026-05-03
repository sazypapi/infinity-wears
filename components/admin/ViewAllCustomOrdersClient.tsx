"use client";
import { useState } from "react";
import { customOrderType } from "../dashboard/custom-orders/CustomOrdersContainer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
import Link from "next/link";
import { formatDateMonthAndYear } from "../../utils/format";
const getDaysAgo = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
};

type customOrderWithUsers = customOrderType & {
  user: {
    firstName: string | null;
    lastName: string | null;
  };
};
function ViewAllCustomOrdersClient({
  customOrders,
}: {
  customOrders: customOrderWithUsers[];
}) {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [garmentType, setGarmentType] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const filtered = customOrders.filter((order) => {
    const fullName =
      `${order.user?.firstName} ${order.user?.lastName}`.toLowerCase();
    const matchesSearch =
      !search || fullName?.includes(search) || order.id.includes(search);
    const orderDate = new Date(order.createdAt);
    const matchesDate =
      !dateFilter ||
      (dateFilter === "7days" && orderDate >= getDaysAgo(7)) ||
      (dateFilter === "30days" && orderDate >= getDaysAgo(30)) ||
      (dateFilter === "90days" && orderDate >= getDaysAgo(90)) ||
      (dateFilter === "thisYear" &&
        orderDate.getFullYear() === new Date().getFullYear());
    const matchesStatus = !statusFilter || statusFilter === order.status;
    const matchesGarmentType =
      !garmentType || garmentType === order.garmentType;
    return matchesDate && matchesSearch && matchesStatus && matchesGarmentType;
  });

  return (
    <div className="w-full">
      {/* {DESKTOP FILTER} */}
      <div className="hidden sm:flex gap-2 mb-4 ">
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
                onClick={() => setStatusFilter("PENDING")}
              >
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setStatusFilter("SEEN")}
              >
                Seen
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setStatusFilter("ACCEPTED")}
              >
                Accepted
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setStatusFilter("REJECTED")}
              >
                Rejected
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setStatusFilter("DONE")}
              >
                Done
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
        {/* {GARMENT TYPE} */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="whitespace-nowrap text-xs px-2 bg-transparent border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
              Garment Type
              <IoIosArrowDown />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-neutral-400">
                Choose Garment Type
              </DropdownMenuLabel>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setGarmentType("")}
              >
                All Garment Types
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setGarmentType("SHIRT")}
              >
                Shirt
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setGarmentType("TROUSER")}
              >
                Trouser
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setGarmentType("DRESS")}
              >
                Dress
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setGarmentType("JACKET")}
              >
                Jacket
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setGarmentType("SWEATSHIRT")}
              >
                Sweat Shirt
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
            setGarmentType("");
          }}
        >
          Clear Filters
        </button>
      </div>
      {/* {MOBILE FILTER} */}
      <div className="sm:hidden overflow-hidden w-full">
        <ScrollArea className="w-full">
          <div className="flex gap-2 mb-4">
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
                    onClick={() => setStatusFilter("PENDING")}
                  >
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="capitalize text-black"
                    onClick={() => setStatusFilter("SEEN")}
                  >
                    Seen
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="capitalize text-black"
                    onClick={() => setStatusFilter("ACCEPTED")}
                  >
                    Accepted
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="capitalize text-black"
                    onClick={() => setStatusFilter("REJECTED")}
                  >
                    Rejected
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="capitalize text-black"
                    onClick={() => setStatusFilter("DONE")}
                  >
                    Done
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
            {/* {GARMENT TYPE} */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="whitespace-nowrap text-xs px-2 bg-transparent border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
                  Garment Type
                  <IoIosArrowDown />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs text-neutral-400">
                    Choose Garment Type
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    className="capitalize text-black"
                    onClick={() => setGarmentType("")}
                  >
                    All Garment Types
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="capitalize text-black"
                    onClick={() => setGarmentType("SHIRT")}
                  >
                    Shirt
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="capitalize text-black"
                    onClick={() => setGarmentType("TROUSER")}
                  >
                    Trouser
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="capitalize text-black"
                    onClick={() => setGarmentType("DRESS")}
                  >
                    Dress
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="capitalize text-black"
                    onClick={() => setGarmentType("JACKET")}
                  >
                    Jacket
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="capitalize text-black"
                    onClick={() => setGarmentType("SWEATSHIRT")}
                  >
                    Sweat Shirt
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
                setGarmentType("");
              }}
            >
              Clear Filters
            </button>
          </div>
          <ScrollBar orientation="horizontal" className="mt-3" />
        </ScrollArea>
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
                  setGarmentType("");
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
            <h6 className="text-xs text-neutral-700">Garment Type</h6>
            <h6 className="text-xs text-neutral-700 hidden sm:inline">Date</h6>

            <h6 className="text-xs text-neutral-700">Order Status</h6>
          </div>

          {/* Orders list */}
          {filtered.map((order) => (
            <Link href={`/admin/custom-orders/${order.id}`} key={order.id}>
              <div className="grid sm:grid-cols-6 grid-cols-4 justify-between items-center bg-neutral-300 sm:py-3 p-2 sm:px-2 rounded-2xl mb-3 gap-2">
                <h6 className="truncate text-black text-xs sm:text-sm">
                  {order.id.slice(0, 10).toUpperCase()}
                </h6>
                <h6 className="text-black text-xs sm:text-sm truncate">
                  {order.user?.firstName} {order.user?.lastName}
                </h6>
                <h6 className="text-black text-xs sm:text-sm truncate capitalize">
                  {order.garmentType.charAt(0).toUpperCase() +
                    order.garmentType.slice(1).toLowerCase()}
                </h6>
                <h6 className="hidden sm:inline text-black text-sm">
                  {formatDateMonthAndYear(order.createdAt)}
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

export default ViewAllCustomOrdersClient;
