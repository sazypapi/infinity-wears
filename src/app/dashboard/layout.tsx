import React from "react";

import { currentUser } from "@clerk/nextjs/server";
import Containers from "../../../components/global/Containers";

import BreadCrumbs from "../../../components/dashboard/BreadCrumbs";
import DashboardSectionGridEdit from "../../../components/dashboard/DashboardSectionGridEdit";

async function layout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  return (
    <>
      <Containers className="hidden lg:grid px-2 xl:max-w-[85%] sm:p-10">
        <h2 className="text-2xl">Welcome {user?.firstName}</h2>
        <DashboardSectionGridEdit children={children} />
      </Containers>
      <Containers className="lg:hidden px-2 py-5">
        <BreadCrumbs />
        <div className="mt-3">{children}</div>
      </Containers>
    </>
  );
}

export default layout;
