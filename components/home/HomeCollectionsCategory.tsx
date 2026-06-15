"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const links = [
  {
    label: "Male",
    link: "/collections/gender/male",
    image:
      "https://files.edgestore.dev/ij70l6t4xyeuequ7/publicFiles/_public/71ff4334-2b2a-43b8-91d5-87c0a4e6a850.jpg",
  },
  {
    label: "Female",
    link: "/collections/gender/female",
    image:
      "https://files.edgestore.dev/ij70l6t4xyeuequ7/publicFiles/_public/6c819111-e29f-40c4-b6ec-4424480905d9.jpg",
  },
  {
    label: "Footwear",
    link: "/collections/category/footwear",
    image:
      "https://files.edgestore.dev/ij70l6t4xyeuequ7/publicFiles/_public/d377e620-2ce4-4d43-bba2-331ac1a95706.jpg",
  },
  {
    label: "Accessories",
    link: "/collections/category/accessories",
    image:
      "https://files.edgestore.dev/ij70l6t4xyeuequ7/publicFiles/_public/1ccc617a-4dfa-48ea-a05d-1e14a08b92aa.jpg",
  },
];

function HomeCollectionsCategory() {
  const [api, setApi] = useState<EmblaCarouselType | undefined>(undefined);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!api) return;

    setScrollSnaps(api.scrollSnapList());
    setSelectedIndex(api.selectedScrollSnap());

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <>
      {/* Mobile carousel */}
      <div className="md:hidden relative w-full mt-5">
        <Carousel
          plugins={[Autoplay({ delay: 4000 })]}
          setApi={setApi}
          className="w-full">
          <CarouselContent>
            {links.map((link) => (
              <CarouselItem key={link.image} className="basis-3/4">
                <div
                  className="relative h-[70vh] w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${link.image})` }}>
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <Link href={link.link}>
                      <Button
                        asChild
                        className="rounded-none bg-transparent border-white text-white border-2 shadow-lg hover:bg-black hover:border-black transition duration-500">
                        <h1 className="text-xl">{link.label}</h1>
                      </Button>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dot navigation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === selectedIndex
                  ? "bg-white scale-110"
                  : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid gap-3 mt-5 grid-cols-4">
        {links.map((link) => (
          <div
            key={link.image}
            className="relative h-[70vh] w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${link.image})` }}>
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 flex items-center justify-center h-full">
              <Link href={link.link}>
                <Button
                  asChild
                  className="rounded-none bg-transparent border-white text-white border-2 shadow-lg hover:bg-black hover:border-black transition duration-500">
                  <h1 className="text-xl">{link.label}</h1>
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default HomeCollectionsCategory;
