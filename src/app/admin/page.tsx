import React from "react";

import Containers from "../../../components/global/Containers";
import AdminTabs from "../../../components/admin/AdminTabs";
import { Button } from "@/components/ui/button";
import { FaPlusCircle } from "react-icons/fa";
import Link from "next/link";
import CreateCollectionPopOver from "../../../components/admin/CreateCollectionPopOver";

async function Admin() {
  return (
    <Containers className="py-5 sm:mt-14">
      <div className="flex justify-end w-full align-middle items-center py-3 px-2 mb-5 ">
        {/* <Username /> */}
        <Button
          variant="link"
          asChild
          className="text-neutral-950 shadow-lg hover:bg-black hover:text-white border-2 border-black transition duration-500 "
        >
          <Link href="/admin/create-product">
            <FaPlusCircle /> Create Product
          </Link>
        </Button>
      </div>
      <AdminTabs />
    </Containers>
  );
}

export default Admin;
