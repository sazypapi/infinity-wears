"use client";
import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <>
      <Link href="/">
        <Image
          src="/images/CHRISTIANSCANDRIP.png"
          priority
          alt="Logo"
          width={70}
          height={70}
        />
      </Link>
    </>
  );
}

export default Logo;
