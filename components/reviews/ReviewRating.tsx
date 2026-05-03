import { Progress } from "@/components/ui/progress";

import { FaStar } from "react-icons/fa";

async function ReviewRating({
  oneStar,
  threeStar,
  twoStar,
  fourStar,
  fiveStar,
  totalRating,
  averageRating,
}: {
  oneStar: number;
  threeStar: number;
  twoStar: number;
  fourStar: number;
  fiveStar: number;
  totalRating: number;
  averageRating: number;
}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center align-middle gap-2">
        <div className="flex-1/2 flex flex-col">
          {/* FIVE STAR */}
          <section className="flex align-middle items-center justify-center w-full mb-2">
            <h6 className="text-xs w-12">five</h6>{" "}
            <FaStar className="w-3 h-3 mr-2 text-primary" />
            <Progress value={(fiveStar / totalRating) * 100} />
            <h6 className="text-xs ml-2">{fiveStar}</h6>
          </section>
          {/* FOUR STAR */}
          <section className="flex align-middle items-center justify-center w-full mb-2  ">
            <h6 className="text-xs w-12">four</h6>{" "}
            <FaStar className="w-3 h-3 mr-2 text-primary" />
            <Progress value={(fourStar / totalRating) * 100} />
            <h6 className="text-xs ml-2">{fourStar}</h6>
          </section>{" "}
          {/* THREE STAR */}
          <section className="flex align-middle items-center justify-center w-full mb-2">
            <h6 className="text-xs w-12">three</h6>{" "}
            <FaStar className="w-3 h-3 mr-2 text-primary" />
            <Progress value={(threeStar / totalRating) * 100} />
            <h6 className="text-xs ml-2">{threeStar}</h6>
          </section>{" "}
          {/* TWO STAR */}
          <section className="flex align-middle items-center justify-center w-full mb-2">
            <h6 className="text-xs w-12">two</h6>{" "}
            <FaStar className="w-3 h-3 mr-2 text-primary" />
            <Progress value={(twoStar / totalRating) * 100} />
            <h6 className="text-xs ml-2">{twoStar}</h6>
          </section>{" "}
          {/* ONE STAR */}
          <section className="flex align-middle items-center justify-center w-full">
            <h6 className="text-xs w-12">one</h6>{" "}
            <FaStar className="w-3 h-3 mr-2 text-primary" />
            <Progress value={(oneStar / totalRating) * 100} />
            <h6 className="text-xs ml-2">{oneStar}</h6>
          </section>
        </div>
        <div className="flex-1/2 flex-col flex items-center justify-center">
          <h1 className="text-3xl">{averageRating.toFixed(1)}/5.0</h1>
          <h3 className="text-muted-foreground">Average Rating</h3>
        </div>
      </div>
    </>
  );
}

export default ReviewRating;
