import Containers from "../../../components/global/Containers";
import AdminTabs from "../../../components/admin/AdminTabs";
import { Button } from "@/components/ui/button";
import { FaPlusCircle } from "react-icons/fa";
import Link from "next/link";
import { FaChartBar } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

async function Admin() {
  return (
    <Containers className="py-5 px-2">
      <div className="w-full flex justify-start">
        <Link
          href="/admin/view-messages"
          className="flex item-end text-xs sm:text-sm underline">
          View all Messages <FiArrowUpRight />
        </Link>
      </div>
      <div className="flex justify-between w-full align-middle items-center py-3 px-2 mb-5 ">
        <Link
          href="/admin/sales"
          className=" text-xs sm:text-sm hover:cursor-pointer">
          <Button
            variant="link"
            className="text-neutral-950 hover:bg-black hover:text-white border-2 border-black transition duration-500 px-2 py-1">
            <FaChartBar className="w-6 h-6" /> View Sales
          </Button>
        </Link>
        <Link
          href="/admin/create-product"
          className="text-xs sm:text-sm hover:cursor-pointer">
          <Button
            variant="link"
            className="text-neutral-950 hover:bg-black hover:text-white border-2 border-black transition duration-500 px-2 py-1">
            <FaPlusCircle className="w-6 h-6" /> Create Product
          </Button>
        </Link>
      </div>
      <AdminTabs />
    </Containers>
  );
}

export default Admin;
