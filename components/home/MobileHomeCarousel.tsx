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
import { HomeCarousel } from "@/generated/prisma";

function MobileHomeCarousel({
  carouselItems,
}: {
  carouselItems: HomeCarousel[];
}) {
  // ✅ Use correct type: matches shadcn/ui Carousel expectations
  const [api, setApi] = useState<EmblaCarouselType | undefined>(undefined);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!api) return;

    const snapList = api.scrollSnapList();
    const selected = api.selectedScrollSnap();

    setScrollSnaps(snapList);
    setSelectedIndex(selected);

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
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
        <CarouselContent>
          {carouselItems.map((item) => (
            <CarouselItem key={item.id}>
              <div
                className="relative h-[80vh] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${item.mobileImage})` }}
              >
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 flex items-center justify-center h-full">
                  <Link href={item.link}>
                    <Button
                      asChild
                      className="mt-[10vh] rounded-none bg-transparent border-white text-white border-2 shadow-lg hover:bg-black hover:border-black transition duration-500"
                    >
                      <h1 className="text-xl">{item.text}</h1>
                    </Button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dot Navigation */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
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
  );
}

export default MobileHomeCarousel;
