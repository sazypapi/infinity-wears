import Containers from "../../../components/global/Containers";
import AdminTabs from "../../../components/admin/AdminTabs";
import { Button } from "@/components/ui/button";
import { FaPlusCircle } from "react-icons/fa";
import Link from "next/link";
import { FaChartBar } from "react-icons/fa";

async function Admin() {
  return (
    <Containers className="py-5 px-2">
      <div className="flex justify-between w-full align-middle items-center py-3 px-2 mb-5 ">
        {/* <Username /> */}
        <Button
          variant="link"
          asChild
          className="text-neutral-950 shadow-lg hover:bg-black hover:text-white border-2 border-black transition duration-500 px-2 py-1"
        >
          <Link href="/admin/sales" className=" text-xs sm:text-sm">
            <FaChartBar className="w-6 h-6" /> View Sales
          </Link>
        </Button>
        <Button
          variant="link"
          asChild
          className="text-neutral-950 shadow-lg hover:bg-black hover:text-white border-2 border-black transition duration-500 px-2 py-1"
        >
          <Link href="/admin/create-product" className="text-xs sm:text-sm">
            <FaPlusCircle className="w-6 h-6" /> Create Product
          </Link>
        </Button>
      </div>
      <AdminTabs />
    </Containers>
  );
}

export default Admin;
