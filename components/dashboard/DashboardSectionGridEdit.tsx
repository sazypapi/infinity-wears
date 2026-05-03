"use client";
import Sidebar from "@/app/dashboard/Sidebar";
import { usePathname } from "next/navigation";
import React from "react";

function DashboardSectionGridEdit({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const isDashboard = pathName === "/dashboard";

  return (
    <section className="grid lg:grid-cols-12 gap-12 mt-12">
      {!isDashboard && (
        <div className="lg:col-span-3">
          <Sidebar />
        </div>
      )}
      <div
        className={
          isDashboard
            ? "shadow-xs border-2 border-neutral-200 rounded-sm p-4 lg:col-span-12"
            : "shadow-xs border-2 border-neutral-200 rounded-sm p-4 lg:col-span-9"
        }
      >
        {children}
      </div>
    </section>
  );
}

export default DashboardSectionGridEdit;
