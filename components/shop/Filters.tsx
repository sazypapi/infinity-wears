"use client";
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
import { SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDebouncedCallback } from "use-debounce";
function Filters({
  allColors,
  allSizes,
  allCategories,
  allMaterials,
  allGenders,
}: {
  allColors: string[];
  allSizes: string[];
  allCategories: string[];
  allMaterials: string[];
  allGenders: string[];
}) {
  const formatAllCaps = (status: string) =>
    status.charAt(0) + status.slice(1).toLowerCase();
  const router = useRouter();
  const searchParams = useSearchParams();
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(key, value);

    router.push(`/shop?${params.toString()}`);
  };
  const clearAllFilters = () => {
    router.push("/shop");
  };
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
    router.replace(`/shop?${params.toString()}`);
  }, 500);

  const searchValue = searchParams.get("search");

  useEffect(() => {
    if (!searchValue) {
      setSearch("");
    }
  }, [searchValue]);
  return (
    <>
      <div className="hidden sm:flex justify-between align-middle items-center sm:px-10">
        <div className="flex justify-between align-middle items-center gap-5">
          {/* {size} */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm px-2 bg-white border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
                Size
                <IoIosArrowDown />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-neutral-400">
                  All Sizes
                </DropdownMenuLabel>
                {allSizes.map((size) => {
                  return (
                    <DropdownMenuItem
                      key={size}
                      className="capitalize text-black"
                      onClick={() => updateFilter("size", size)}
                    >
                      {size}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* {gender} */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm px-2 bg-white border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
                Gender
                <IoIosArrowDown />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-neutral-400">
                  All Genders
                </DropdownMenuLabel>
                {allGenders.map((gender) => {
                  return (
                    <DropdownMenuItem
                      key={gender}
                      className="capitalize text-black"
                      onClick={() => updateFilter("gender", gender)}
                    >
                      {formatAllCaps(gender)}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* {color} */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm px-2 bg-white border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
                Color
                <IoIosArrowDown />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-neutral-400">
                  All Colors
                </DropdownMenuLabel>
                {allColors.map((color) => {
                  return (
                    <DropdownMenuItem
                      key={color}
                      className="capitalize text-black"
                      onClick={() => updateFilter("color", color)}
                    >
                      {color}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* {category} */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm px-2 bg-white border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
                Category
                <IoIosArrowDown />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-neutral-400">
                  All Categories
                </DropdownMenuLabel>
                {allCategories.map((category) => {
                  return (
                    <DropdownMenuItem
                      key={category}
                      className="capitalize text-black"
                      onClick={() => updateFilter("category", category)}
                    >
                      {formatAllCaps(category)}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* {material} */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm px-2 bg-white border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
                Material
                <IoIosArrowDown />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-neutral-400">
                  All Materials
                </DropdownMenuLabel>
                {allMaterials.map((material) => {
                  return (
                    <DropdownMenuItem
                      key={material}
                      className="capitalize text-black"
                      onClick={() => updateFilter("material", material)}
                    >
                      {material}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* {sort} */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm px-2 bg-white border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
                Sort
                <IoIosArrowDown />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => updateFilter("sort", "price_asc")}
              >
                Price: low-high
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateFilter("sort", "price_desc")}
              >
                Price: high-low
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateFilter("sort", "newest")}>
                Newest
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateFilter("sort", "bestselling")}
              >
                BestSelling
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* {clear} */}
        <div>
          <button
            className="text-sm px-2 bg-white border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700"
            onClick={clearAllFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>
      {/* {MOBILE} */}
      <div className="sm:hidden grid grid-cols-3 px-2 items-center gap-2 mb-4">
        <input
          placeholder="search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
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
              className="h-fit py-10 bg-black/30 backdrop-blur-md backdrop-saturate-150"
              showCloseButton={false}
            >
              <SheetTitle className="px-5 text-white">Filters</SheetTitle>
              <div className="grid grid-cols-2 gap-x-10 gap-y-5 mt-4 p-5">
                {/* SIZE */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-xs px-2 py-2 bg-transparent border-2 border-white rounded-2xl text-white flex justify-between items-center w-full active:scale-95 active:bg-white/10 transition duration-150">
                      Size <IoIosArrowDown />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white w-full p-4">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs text-neutral-400">
                        All Sizes
                      </DropdownMenuLabel>
                      {allSizes.map((size) => (
                        <DropdownMenuItem
                          key={size}
                          className="capitalize text-black active:bg-neutral-100 transition duration-150"
                          onClick={() => updateFilter("size", size)}
                        >
                          {size}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* GENDER */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-xs px-2 py-2 bg-transparent border-2 border-white rounded-2xl text-white flex justify-between items-center w-full active:scale-95 active:bg-white/10 transition duration-150">
                      Gender <IoIosArrowDown />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs text-neutral-400">
                        All Genders
                      </DropdownMenuLabel>
                      {allGenders.map((gender) => (
                        <DropdownMenuItem
                          key={gender}
                          className="capitalize text-black active:bg-neutral-100 transition duration-150"
                          onClick={() => updateFilter("gender", gender)}
                        >
                          {formatAllCaps(gender)}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* COLOR */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-xs px-2 py-2 bg-transparent border-2 border-white rounded-2xl text-white flex justify-between items-center w-full active:scale-95 active:bg-white/10 transition duration-150">
                      Color <IoIosArrowDown />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs text-neutral-400">
                        All Colors
                      </DropdownMenuLabel>
                      {allColors.map((color) => (
                        <DropdownMenuItem
                          key={color}
                          className="capitalize text-black active:bg-neutral-100 transition duration-150"
                          onClick={() => updateFilter("color", color)}
                        >
                          {color}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* CATEGORY */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-xs px-2 py-2 bg-transparent border-2 border-white rounded-2xl text-white flex justify-between items-center w-full active:scale-95 active:bg-white/10 transition duration-150">
                      Category <IoIosArrowDown />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs text-neutral-400">
                        All Categories
                      </DropdownMenuLabel>
                      {allCategories.map((category) => (
                        <DropdownMenuItem
                          key={category}
                          className="capitalize text-black active:bg-neutral-100 transition duration-150"
                          onClick={() => updateFilter("category", category)}
                        >
                          {formatAllCaps(category)}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* MATERIAL */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-xs px-2 py-2 bg-transparent border-2 border-white rounded-2xl text-white flex justify-between items-center w-full active:scale-95 active:bg-white/10 transition duration-150">
                      Material <IoIosArrowDown />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs text-neutral-400">
                        All Materials
                      </DropdownMenuLabel>
                      {allMaterials.map((material) => (
                        <DropdownMenuItem
                          key={material}
                          className="capitalize text-black active:bg-neutral-100 transition duration-150"
                          onClick={() => updateFilter("material", material)}
                        >
                          {material}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* SORT */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-xs px-2 py-2 bg-transparent border-2 border-white rounded-2xl text-white flex justify-between items-center w-full active:scale-95 active:bg-white/10 transition duration-150">
                      Sort <IoIosArrowDown />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    <DropdownMenuItem
                      className="active:bg-neutral-100 transition duration-150"
                      onClick={() => updateFilter("sort", "price_asc")}
                    >
                      Price: low-high
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="active:bg-neutral-100 transition duration-150"
                      onClick={() => updateFilter("sort", "price_desc")}
                    >
                      Price: high-low
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="active:bg-neutral-100 transition duration-150"
                      onClick={() => updateFilter("sort", "newest")}
                    >
                      Newest
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="active:bg-neutral-100 transition duration-150"
                      onClick={() => updateFilter("sort", "bestselling")}
                    >
                      BestSelling
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* CLEAR */}
                <button
                  className="text-xs px-2 py-2 bg-transparent border-2 border-white rounded-2xl text-white w-full col-span-2 active:scale-95 active:bg-white/10 transition duration-150"
                  onClick={clearAllFilters}
                >
                  Clear Filters
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}

export default Filters;
