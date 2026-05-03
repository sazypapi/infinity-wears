"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DashboardNav from "./DashboardNav";
import { usePathname } from "next/navigation";

function BreadCrumbs() {
  const pathName = usePathname();
  const isDashboard = pathName === "/dashboard";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="sm:text-sm text-xs" href="/dashboard">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        {!isDashboard && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="sm:text-sm text-xs">
                <DashboardNav />
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadCrumbs;
