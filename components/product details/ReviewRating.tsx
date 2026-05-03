import { FaStar } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";

function ReviewRating() {
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
    </>
  );
}

export default ReviewRating;
