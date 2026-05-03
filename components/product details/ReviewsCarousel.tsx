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

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Rating from "./Ratings";
import { Review } from "@/generated/prisma";

function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
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
          {reviews.map((review, index) => (
            <CarouselItem key={review.id}>
              <Card className="bg-white border-2 border-gray-200 pt-3 mt-3">
                <CardHeader>
                  <CardTitle className="flex align-middle text-black items-center justify-between">
                    {review.authorName}
                    <Image
                      src={review.authorImageUrl}
                      height={30}
                      width={30}
                      className="rounded-full"
                      alt="profile image"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-black">
                  {review.description}
                </CardContent>
                <CardFooter>
                  <Rating rating={review.rating} />
                </CardFooter>
              </Card>
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
          {selectedIndex + 1} / {reviews.length}
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

export default ReviewsCarousel;
