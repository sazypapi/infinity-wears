"use client";

import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import BottomNav from "../global/BottomNav";
import { Toaster } from "@/components/ui/sonner";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="bg-white text-black">{children}</main>
      <Footer />
      <div className="sm:hidden">
        <BottomNav />
      </div>
      <Toaster />
    </>
  );
}
