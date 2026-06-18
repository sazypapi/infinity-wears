"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { Prisma } from "@/generated/prisma";
import Image from "next/image";
import { formatCurrency } from "../../utils/format";
import Link from "next/link";

type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true };
}>;

interface SkeletonCarouselProps {
  items: ProductWithVariants[];
  autoplayDelay?: number;
  children: React.ReactNode[];
  link: string;
}

export function FeaturedProducts({
  items,
  autoplayDelay = 2000,
  children,
  link,
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
        className="w-full">
        <CarouselContent className="px-2">
          {items.map((product, index) => {
            const firstVariant = product.variants[0];
            return (
              <CarouselItem
                key={product.id}
                className="basis-1/2 md:basis-1/2 lg:basis-1/3 flex justify-center">
                <article className="group relative w-fit flex flex-col items-center">
                  <Link href={`${link}/${product.slug}`}>
                    <div className="w-36 h-48 md:w-44 md:h-60 lg:w-52 lg:h-72 rounded-lg relative overflow-hidden">
                      <Image
                        src={firstVariant.coverImage}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        fill
                      />
                    </div>
                    <div className="w-36 sm:w-60 mt-2">
                      <p className="text-gray-500 text-sm text-center truncate">
                        {product.name}
                      </p>
                      <p className="text-gray-800 text-xs text-center truncate">
                        {formatCurrency(firstVariant.price)}
                      </p>
                    </div>
                  </Link>
                  {/* button passed in from server by index */}
                  <div className="absolute top-0 left-4 z-20">
                    {children[index]}
                  </div>
                </article>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
