// components/BottomNavWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav";

export default function BottomNavWrapper() {
  const pathname = usePathname();

  // hide on cart page
  if (pathname === "/cart") return null;

  return <BottomNav />;
}
