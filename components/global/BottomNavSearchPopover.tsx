"use client";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
function BottomNavSearchPopover() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || "",
  );
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`/shop?${params.toString()}`);
  }, 500);

  const searchValue = searchParams.get("search");

  useEffect(() => {
    if (!searchValue) {
      setSearch("");
    }
  }, [searchValue]);
  return (
    // <Dialog>
    //   <DialogTrigger asChild suppressHydrationWarning>
    //     <IoMdSearch className="h-9 w-9 text-white" />
    //   </DialogTrigger>
    //   <DialogContent
    //     className="sm:max-w-[425px]   bg-black/30 backdrop-blur-sm backdrop-saturate-150
    //         border-t
    //         shadow-lg
    //         text-white rounded-4xl"
    //   >
    //     <DialogTitle>Search</DialogTitle>

    //     <input
    //       value={search}
    //       onChange={(e) => {
    //         setSearch(e.target.value);
    //         handleSearch(e.target.value);
    //       }}
    //       type="search"
    //       placeholder="search products..."
    //       className="text-xs p-2 text-neutral-400 border-2 border-neutral-800 rounded-sm focus:outline-none"
    //     />
    //   </DialogContent>
    // </Dialog>
    <Popover>
      <PopoverTrigger>
        <IoMdSearch className="h-9 w-9 text-white" />
      </PopoverTrigger>
      <PopoverContent>
        {/* <PopoverHeader>
          <PopoverTitle>Title</PopoverTitle>
          <PopoverDescription>Description text here.</PopoverDescription>
        </PopoverHeader> */}
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
          type="search"
          placeholder="search products..."
          className="text-xs p-2 text-neutral-400 border-2 border-neutral-800 rounded-sm focus:outline-none"
        />
      </PopoverContent>
    </Popover>
  );
}

export default BottomNavSearchPopover;
