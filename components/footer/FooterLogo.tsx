import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function FooterLogo() {
  return (
    <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center py-5 border-b-2 w-full border-neutral-100 gap-4 sm:gap-0 mb-4">
      <div className="flex sm:flex-1/2 flex-1/3">
        <Link href="/">
          <Image
            src="/images/CHRISTIANSCANDRIP.png"
            priority
            alt="Logo"
            width={150}
            height={150}
          />
        </Link>
      </div>
      <p className="text-neutral-100 flex text-center flex-1/2 text-xs sm:text-right">
        Infinity Wears is a modern clothing brand built on confidence, faith,
        and timeless style. We create pieces that speak identity, purpose, and
        drip without limits.
      </p>
    </div>
  );
}

export default FooterLogo;
