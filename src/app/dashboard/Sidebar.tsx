"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

import { dashboardLinks } from "../../../utils/links";

function Sidebar() {
  const pathName = usePathname();
  if (pathName === "/dashboard") return null;

  return (
    <aside className="shadow-xs border-2 border-neutral-100 rounded-md h-120">
      {dashboardLinks.map((link, index) => {
        const isActivePage = pathName.startsWith(link.href);
        return (
          <div
            className={
              index === dashboardLinks.length - 1
                ? ""
                : "border-b-2 border-neutral-200"
            }
            key={link.href}
          >
            <Button
              asChild
              className={
                isActivePage
                  ? "w-full rounded-none bg-neutral-500 capitalize font-normal text-left justify-start hover:bg-neutral-500 py-6 transition duration-500"
                  : "w-full rounded-none capitalize font-normal bg-white hover:text-white transition duration-500 text-black text-left justify-start hover:bg-neutral-500 py-6"
              }
            >
              <Link href={link.href}>
                {link.icon && <link.icon />}
                {link.label}
              </Link>
            </Button>
          </div>
        );
      })}
    </aside>
  );
}

export default Sidebar;
