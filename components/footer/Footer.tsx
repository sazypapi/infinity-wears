"use client";
import { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import Containers from "../global/Containers";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import FooterLogo from "./FooterLogo";
// import FooterMidRange from "./FooterMidRange";
import FooterLastPart from "./FooterLastPart";
function Footer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <Containers
      className="relative flex flex-col p-10 items-center justify-between xl:max-w-full
             bg-[url('/images/footerBg.jpg')] bg-cover bg-center bg-no-repeat pb-20"
    >
      {/* Blur + dark overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Content (kept sharp) */}
      <div className="relative z-10 flex flex-col items-center justify-between w-full gap-6">
        <FooterLogo />
        {/* <FooterMidRange /> */}
        <FooterLastPart />

        <h4 className="text-sm text-center">
          Zedek&apos;s Media 2025 <br />
          <span className="text-muted-foreground text-[0.625rem]">
            ALL RIGHTS RESERVED
          </span>
        </h4>

        <div className="flex justify-center items-center mt-5 gap-5">
          <a href="https://www.instagram.com/zedeks.media?igsh=aHZlcXVsMnY1bzV4">
            <FaInstagram className="h-4 w-4" />
          </a>
          <a href="mailto:zedeksmedia24@gmail.com">
            <Mail className="h-4 w-4" />
          </a>
          <a href="tel:08089033810">
            <Phone className="h-4 w-4" />
          </a>
          <a href="https://api.whatsapp.com/send?phone=2348089033810&text=I%20want%20to%20make%20an%20enquiry%0A">
            <FaWhatsapp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </Containers>
  );
}

export default Footer;
