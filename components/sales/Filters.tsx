import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegCalendarAlt } from "react-icons/fa";

function Filters({
  setRange,
  range,
  customStart,
  customEnd,
  setCustomStart,
  setCustomEnd,
}: {
  setRange: (range: string) => void;
  range: string;
  customStart: string;
  customEnd: string;
  setCustomStart: (date: string) => void;
  setCustomEnd: (date: string) => void;
}) {
  return (
    <div className="flex w-full justify-start gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="whitespace-nowrap text-xs px-2 py-1 bg-transparent border-2 border-neutral-500 hover:bg-neutral-700 rounded-2xl text-neutral-500 hover:text-white transition duration-300 flex justify-center align-middle items-center hover:border-neutral-700">
            <FaRegCalendarAlt className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-xs text-neutral-400">
              Select Time Frame
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="capitalize text-black"
              onClick={() => setRange("allTime")}
            >
              All Time
            </DropdownMenuItem>
            <DropdownMenuItem
              className="capitalize text-black"
              onClick={() => setRange("7days")}
            >
              Last 7 Days
            </DropdownMenuItem>
            <DropdownMenuItem
              className="capitalize text-black"
              onClick={() => setRange("30days")}
            >
              Last 30 Days
            </DropdownMenuItem>
            <DropdownMenuItem
              className="capitalize text-black"
              onClick={() => setRange("90days")}
            >
              Last 90 Days
            </DropdownMenuItem>
            <DropdownMenuItem
              className="capitalize text-black"
              onClick={() => setRange("thisYear")}
            >
              This Year
            </DropdownMenuItem>
            <DropdownMenuItem
              className="capitalize text-black"
              onClick={() => setRange("custom")}
            >
              Custom
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Date inputs appear outside the dropdown when custom is selected */}
      {range === "custom" ? (
        <div className="flex gap-2 items-center">
          <input
            type="date"
            value={customStart}
            onChange={(e) => setCustomStart(e.target.value)}
            className="border-2 rounded-2xl px-2 py-1 text-xs border-neutral-500 text-black"
          />
          <span className="text-xs text-neutral-500">to</span>
          <input
            type="date"
            value={customEnd}
            onChange={(e) => setCustomEnd(e.target.value)}
            className="border-2 rounded-2xl px-2 py-1 text-xs border-neutral-500 text-black"
          />
        </div>
      ) : range === "allTime" ? (
        <p className="text-xs text-neutral-600">All Time</p>
      ) : range === "7days" ? (
        <p className="text-xs text-neutral-600">Last 7 days</p>
      ) : range === "30days" ? (
        <p className="text-xs text-neutral-600">Last 30 days</p>
      ) : range === "90days" ? (
        <p className="text-xs text-neutral-600">Last 90 days</p>
      ) : (
        <p className="text-xs text-neutral-600">This Year</p>
      )}
    </div>
  );
}

export default Filters;
