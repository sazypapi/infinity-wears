import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiMenu5Fill } from "react-icons/ri";
import { links } from "../../utils/links";
import Link from "next/link";
function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button variant="outline" className="flex align-middle items-center"> */}
        <RiMenu5Fill className="w-8 h-8" />
        {/* </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" alignOffset={0} className="w-40">
        {links.map((link) => {
          return (
            <DropdownMenuItem key={link.href}>
              <Link href={link.href} className="capitalize w-full">
                {link.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Menu;
