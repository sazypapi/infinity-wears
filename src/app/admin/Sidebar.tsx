"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";

function Sidebar() {
  const [isActive, setIsActive] = useState(false);
  const onButtonClick = () => setIsActive(!isActive);
  const pathName = usePathname();
  //   const isActivePage = pathName === link.href;
  const variant = isActive ? "default" : "ghost";
  return (
    <aside className="bg-gray-300 shadow-2xl rounded-2xl p-2">
      <Button
        asChild
        className="w-full mb-2 capitalize font-normal justify-start"
        variant={variant}
      >
        <Link href="/admin">Products</Link>
      </Button>
    </aside>
  );
}

export default Sidebar;
