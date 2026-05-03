"use client";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
  const pathname = usePathname();
  let page = pathname.replace("/dashboard/", "");
  if (pathname.includes("/dashboard/orders/")) {
    page = "Order Item";
  }
  return <p className="capitalize">{page}</p>;
}
