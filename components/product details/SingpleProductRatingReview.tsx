"use client";
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
import { FaStar } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { reviews } from "../../utils/reviews";
function SingpleProductRatingReview() {
  const oneStar = 4;
  const twoStar = 6;
  const threeStar = 12;
  const fourStar = 25;
  const fiveStar = 53;

  const totalRating = oneStar + twoStar + threeStar + fourStar + fiveStar;

  const averageRating =
    (1 * oneStar + 2 * twoStar + 3 * threeStar + 4 * fourStar + 5 * fiveStar) /
    totalRating;
  return (
    <>
      <div className="grid grid-cols-5 justify-between align-middle items-center">
        <div className="col-span-3">
          <div className="flex w-full sm:flex-row justify-center items-center align-middle gap-2">
            <div className="flex-1/2 flex flex-col">
              {/* FIVE STAR */}
              <section className="flex align-middle items-center justify-center w-full mb-2">
                <h6 className="text-xs mr-2 w-4">5</h6>{" "}
                <FaStar className="w-3 h-3 mr-2 text-black" />
                <Progress value={(fiveStar / totalRating) * 100} />
                <h6 className="text-xs ml-2  w-6">{fiveStar}</h6>
              </section>
              {/* FOUR STAR */}
              <section className="flex align-middle items-center justify-center w-full mb-2  ">
                <h6 className="text-xs mr-2 w-4">4</h6>{" "}
                <FaStar className="w-3 h-3 mr-2 text-black" />
                <Progress value={(fourStar / totalRating) * 100} />
                <h6 className="text-xs ml-2 w-6">{fourStar}</h6>
              </section>{" "}
              {/* THREE STAR */}
              <section className="flex align-middle items-center justify-center w-full mb-2">
                <h6 className="text-xs mr-2 w-4">3</h6>{" "}
                <FaStar className="w-3 h-3 mr-2 text-black" />
                <Progress value={(threeStar / totalRating) * 100} />
                <h6 className="text-xs ml-2 w-6">{threeStar}</h6>
              </section>{" "}
              {/* TWO STAR */}
              <section className="flex align-middle items-center justify-center w-full mb-2">
                <h6 className="text-xs mr-2 w-4">2</h6>{" "}
                <FaStar className="w-3 h-3 mr-2 text-black" />
                <Progress value={(twoStar / totalRating) * 100} />
                <h6 className="text-xs ml-2 w-6">{twoStar}</h6>
              </section>{" "}
              {/* ONE STAR */}
              <section className="flex align-middle items-center justify-center w-full">
                <h6 className="text-xs mr-2 w-4">1</h6>{" "}
                <FaStar className="w-3 h-3 mr-2 text-black" />
                <Progress value={(oneStar / totalRating) * 100} />
                <h6 className="text-xs ml-2 w-6">{oneStar}</h6>
              </section>
            </div>
            <div className="flex-1/2 flex-col flex items-center justify-center">
              <h1 className="text-3xl">{averageRating.toFixed(1)}/5.0</h1>
              <h3 className="text-muted-foreground">Average Rating</h3>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <Carousel
            className="mt-5 w-[80%]"
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
            <CarouselPrevious className="hover:text-black hover:border-2 hover:border-black" />
            <CarouselNext className="hover:text-black hover:border-2 hover:border-black" />
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default SingpleProductRatingReview;
