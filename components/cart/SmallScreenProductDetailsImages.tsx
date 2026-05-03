"use client";
import { Prisma } from "@/generated/prisma";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";
import { Button } from "@/components/ui/button";

type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true };
}>;
function SmallScreenProductDetailsImages({
  productDetails,
  currentVariantId,
}: {
  productDetails: ProductWithVariants;
  currentVariantId: string;
}) {
  const [api, setApi] = useState<EmblaCarouselType | undefined>(undefined);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const currentVariant = productDetails.variants.find(
    (variantId) => variantId.id === currentVariantId,
  );
  const allImages = [currentVariant!.coverImage, ...productDetails.images];
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
          {allImages.map((item, index) => (
            <CarouselItem key={index}>
              <div
                className="relative h-[40vh] rounded-sm w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${item})` }}
              ></div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dot Navigation */}

      <div className="mt-3 flex flex-row justify-center align-middle  items-center gap-4">
        <Button
          size="sm"
          className="p-1 bg-transparent text-black hover:bg-transparent"
          onClick={() => api?.scrollPrev()}
        >
          {"<"}
        </Button>

        <span className="text-sm flex justify-center align-middle items-center gap-2">
          {selectedIndex + 1} / {allImages.length}
        </span>

        <Button
          size="sm"
          className="p-1 bg-transparent text-black hover:bg-transparent"
          onClick={() => api?.scrollNext()}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
}

export default SmallScreenProductDetailsImages;
