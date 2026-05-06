"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useRouter, useSearchParams } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
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
      <div className="sm:hidden">
        <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-1">
          {/* <ScrollArea className="w-full"> */}
          <div className="flex justify-between gap-5 align-middle items-center mb-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-xs sm:text-sm px-2 bg-white border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
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
                <button className="text-xs sm:text-sm px-2 bg-white border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
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
                <button className="text-xs sm:text-sm px-2 bg-white border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
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
                <button className="text-xs sm:text-sm px-2 bg-white border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
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
                <button className="text-xs sm:text-sm px-2 bg-white border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
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
            {/* {sort} */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-xs sm:text-sm px-2 bg-white border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
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
                <DropdownMenuItem
                  onClick={() => updateFilter("sort", "newest")}
                >
                  Newest
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => updateFilter("sort", "bestselling")}
                >
                  BestSelling
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* {clear} */}
            <div>
              <button
                className="whitespace-nowrap text-xs sm:text-sm px-2 bg-white border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition w-full duration-300 flex justify-center align-middle items-center hover:border-neutral-700"
                onClick={clearAllFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>
          {/* <ScrollBar orientation="horizontal" className="mt-3" /> */}
          {/* </ScrollArea> */}
        </div>
      </div>
    </>
  );
}

export default Filters;
