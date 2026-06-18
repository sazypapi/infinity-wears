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
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Contact } from "@/generated/prisma";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RxValueNone } from "react-icons/rx";
import FilteredMessages from "./FilteredMessages";
const getDaysAgo = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
};
function AllMessages({ messages }: { messages: Contact[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<boolean | undefined>();
  const [dateFilter, setDateFilter] = useState("");
  const filtered = messages.filter((message) => {
    const fullName = message.name.trim().toLowerCase().replace(/\s+/g, "");
    const searchToLowerCase = search.toLowerCase();
    const matchesSearch =
      !search ||
      fullName.includes(searchToLowerCase) ||
      message.email.toLowerCase().includes(searchToLowerCase) ||
      message.email.toLowerCase().includes(searchToLowerCase) ||
      message.phoneNumber.toString().includes(search);
    const matchesStatus =
      statusFilter === undefined || message.attendedTo === statusFilter;
    const messageDate = new Date(message.createdAt);

    const matchesDate =
      !dateFilter ||
      (dateFilter === "7days" && messageDate >= getDaysAgo(7)) ||
      (dateFilter === "30days" && messageDate >= getDaysAgo(30)) ||
      (dateFilter === "90days" && messageDate >= getDaysAgo(90)) ||
      (dateFilter === "thisYear" &&
        messageDate.getFullYear() === new Date().getFullYear());
    return matchesSearch && matchesStatus && matchesDate;
  });
  return (
    <div className="w-full">
      {/* {DESKTOP FILTER} */}
      <div className="hidden sm:flex gap-2 mb-4">
        <input
          placeholder="Search by name, message, phone, ID, or email"
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
                onClick={() => setStatusFilter(undefined)}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setStatusFilter(true)}>
                Attended To
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setStatusFilter(false)}>
                Pending
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
                onClick={() => setDateFilter("")}>
                All Time
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setDateFilter("7days")}>
                Last 7 days
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setDateFilter("30days")}>
                Last 30 Days
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setDateFilter("90days")}>
                Last 90 Days
              </DropdownMenuItem>
              <DropdownMenuItem
                className="capitalize text-black"
                onClick={() => setDateFilter("thisYear")}>
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
            setStatusFilter(undefined);
          }}>
          Clear Filters
        </button>
      </div>
      {/* {MOBILE FILTER} */}
      <div className="sm:hidden grid grid-cols-3 px-2 items-center gap-2 mb-4">
        <input
          placeholder="Search by name, message, phone, ID, or email"
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
              showCloseButton={false}>
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
                        onClick={() => setStatusFilter(undefined)}>
                        All Status
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="capitalize text-black active:bg-neutral-100 transition duration-150"
                        onClick={() => setStatusFilter(true)}>
                        Attended To
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="capitalize text-black active:bg-neutral-100 transition duration-150"
                        onClick={() => setStatusFilter(false)}>
                        Pending
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
                        onClick={() => setDateFilter("")}>
                        All Time
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="capitalize text-black active:bg-neutral-100 transition duration-150"
                        onClick={() => setDateFilter("7days")}>
                        Last 7 days
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="capitalize text-black active:bg-neutral-100 transition duration-150"
                        onClick={() => setDateFilter("30days")}>
                        Last 30 Days
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="capitalize text-black active:bg-neutral-100 transition duration-150"
                        onClick={() => setDateFilter("90days")}>
                        Last 90 Days
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="capitalize text-black active:bg-neutral-100 transition duration-150"
                        onClick={() => setDateFilter("thisYear")}>
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
                    setStatusFilter(undefined);
                  }}>
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
                  setStatusFilter(undefined);
                  setDateFilter("");
                }}>
                Clear Filters
              </Button>
            </EmptyContent>
          </EmptyHeader>
        </Empty>
      ) : (
        <>
          <FilteredMessages messages={filtered} />
        </>
      )}
    </div>
  );
}

export default AllMessages;
