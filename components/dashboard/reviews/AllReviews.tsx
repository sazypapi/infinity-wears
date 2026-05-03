import { Prisma } from "@/generated/prisma";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Rating from "../../reviews/Ratings";
import EditReview from "./EditReview";
import FormContainer from "../../form/FormContainer";
import { deleteReview } from "../../../utils/actions";
import { IconButton } from "../../form/Buttons";
type AllReview = Prisma.ReviewGetPayload<{
  include: {
    product: {
      include: {
        variants: true;
      };
    };
  };
}>;

function AllReviews({ allReviews }: { allReviews: AllReview[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10  ">
      {allReviews.map((review) => (
        <Card
          key={review.id}
          className="bg-white border-b-2 border-neutral-300 text-black rounded-sm"
        >
          <CardHeader>
            <CardTitle className="grid grid-cols-3 items-center justify-between">
              <div className="h-8 w-8 sm:h-8 sm:w-8 shrink-0 relative overflow-hidden rounded-lg col-span-1">
                <Image
                  src={review.product.variants[0].coverImage}
                  fill
                  className="object-cover"
                  alt={review.product.name}
                />
              </div>

              <h6 className="col-span-2 text-right text-sm truncate">
                {review.product.name}
              </h6>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">{review.description}</CardContent>
          <CardFooter className="flex justify-between align-middle">
            <Rating rating={review.rating} />
            <EditReview review={review} />
            <FormContainer action={deleteReview}>
              <input type="hidden" name="reviewId" value={review.id} />
              <IconButton actionType="delete" />
            </FormContainer>
          </CardFooter>
          {/* <div className="flex justify-end w-full">
            <FormContainer action={deleteReview}>
              <input type="hidden" name="reviewId" value={review.id} />
              <IconButton actionType="delete" />
            </FormContainer>
          </div> */}
        </Card>
      ))}
    </div>
  );
}

export default AllReviews;
