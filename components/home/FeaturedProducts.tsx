"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { Product } from "@/generated/prisma";
import Image from "next/image";
import { formatCurrency } from "../../utils/format";

interface SkeletonCarouselProps {
  items: Product[];
  autoplayDelay?: number;
}

export function FeaturedProducts({
  items,
  autoplayDelay = 4000,
}: SkeletonCarouselProps) {
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
    <div className="relative w-full">
      <Carousel
        plugins={[Autoplay({ delay: autoplayDelay })]}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {items.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-1/2 justify-center w-fit flex flex-col items-center"
            >
              <div className="w-36 h-42 sm:w-60 sm:h-72 rounded-lg relative overflow-hidden">
                <Image
                  src={product.coverImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  fill
                />
              </div>
              <div className="w-36 sm:w-60 mt-2">
                <p className="text-gray-500 text-sm text-center truncate ">
                  {product.name}
                </p>
                <p className="text-gray-800 text-xs text-center truncate ">
                  {formatCurrency(product.price)}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
