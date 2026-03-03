import React from "react";

import Link from "next/link";

import Image from "next/image";
import { reviews } from "../../utils/reviews";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import Rating from "./Ratings";

function Reviews() {
  return (
    <>
      <Carousel
        className="mt-5 w-[60%]"
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent>
          {reviews.map((review) => {
            return (
              <CarouselItem key={review.name}>
                <Card className="bg-white border-2 border-gray-200 ">
                  <CardHeader>
                    <CardTitle className="flex align-middle text-black items-center justify-between">
                      {review.name}
                      <Image
                        src={review.img}
                        height={30}
                        width={30}
                        className="rounded-full"
                        alt="profile image"
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-black">
                    {review.comment}
                  </CardContent>
                  <CardFooter>
                    <Rating rating={review.rating} />{" "}
                  </CardFooter>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}

export default Reviews;
