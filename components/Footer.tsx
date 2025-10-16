"use client";
import React, { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import Containers from "./global/Containers";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
function Footer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <Containers className="flex flex-col py-2 align-baseline  items-center justify-between">
      <Separator className="mb-2" />
      <h4 className="text-sm text-center">
        Zedek&apos;s Media 2025 <br />
        <span className="text-muted-foreground text-xs">
          ALL RIGHTS RESERVED
        </span>
      </h4>
      <div className="flex justify-center align-middle mt-5 gap-5">
        <a href="https://www.instagram.com/zedeks.media?igsh=aHZlcXVsMnY1bzV4">
          <FaInstagram className="h-4 w-4" height="10" width="10" />
        </a>
        <a href="mailto:zedeksmedia24@gmail.com">
          <Mail className="h-4 w-4" />
        </a>
        <a href="tel:08089033810">
          <Phone className="h-4 w-4" />
        </a>
        <a href="https://api.whatsapp.com/send?phone=2348089033810&text=I%20want%20to%20make%20an%20enquiry%0A">
          {/* <Image src={whatsapp} alt="chat with us on whatsapp" /> */}
          <FaWhatsapp className="h-4 w-4" height="10" width="10" />
        </a>
      </div>
    </Containers>
  );
}

export default Footer;
