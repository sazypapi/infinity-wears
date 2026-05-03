// BottomNavWrapper.tsx
"use client";
import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav";

export default function BottomNavWrapper({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();
  if (pathname === "/cart") return null;
  return <BottomNav isAdmin={isAdmin} />;
}
