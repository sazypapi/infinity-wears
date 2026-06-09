"use client";
import { useState } from "react";
import Image from "next/image";

function HoverSwapImage({
  defaultImage,
  hoverImage,
  alt,
}: {
  defaultImage: string;
  hoverImage: string;
  alt: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <Image
        src={defaultImage}
        alt={alt}
        fill
        priority
        className={`object-cover h-full w-full transition-opacity duration-500 ${hovered ? "opacity-0" : "opacity-100"}`}
      />
      <Image
        priority
        src={hoverImage}
        alt={alt}
        fill
        className={`object-cover h-full w-full transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

export default HoverSwapImage;
