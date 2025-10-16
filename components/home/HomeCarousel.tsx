"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { carouselImages } from "../../utils/carouselImages";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function HomeCarousel() {
  const [api, setApi] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!api) return;

    setScrollSnaps(api.scrollSnapList());
    setSelectedIndex(api.selectedScrollSnap());

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  return (
    <div className="relative w-full">
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="">
          {carouselImages.map((item) => (
            <CarouselItem key={item.img}>
              <div
                className="relative h-[90vh] w-full bg-cover bg-center "
                style={{ backgroundImage: `url(${item.img})` }}
              >
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative z-10 flex items-center justify-center h-full">
                  <Button
                    asChild
                    className="mt-[30vh] rounded-none bg-transparent border-white text-white border-2 shadow-lg hover:bg-black hover:border-black transition duration-500"
                  >
                    <Link href="" className="">
                      <h1 className="text-xl">
                        Explore our {item.color} collection
                      </h1>
                    </Link>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dot Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => api && api.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-white scale-110"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeCarousel;
