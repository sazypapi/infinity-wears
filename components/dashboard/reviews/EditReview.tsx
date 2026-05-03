"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Prisma } from "@/generated/prisma";
import FormContainer from "../../form/FormContainer";
import StarRating from "../../product details/StarRating";
import { SubmitButton } from "../../form/Buttons";
import { editReview } from "../../../utils/actions";
import { FaEdit } from "react-icons/fa";

type AllReview = Prisma.ReviewGetPayload<{
  include: {
    product: {
      include: {
        variants: true;
      };
    };
  };
}>;

function EditReview({ review }: { review: AllReview }) {
  const { isSignedIn } = useUser();
  const [description, setDescription] = useState(review.description);
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="flex justify-center align-middle items-center"
      >
        <Button className="text-black hover:cursor-pointer hover:bg-transparent text-base hover:text-red-500 border-none transition duration-500 bg-transparent">
          <FaEdit />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]   bg-black/30 backdrop-blur-sm backdrop-saturate-150
            border-t
            shadow-lg
            text-white rounded-4xl"
      >
        <FormContainer action={editReview}>
          <DialogHeader className="my-5">
            <DialogTitle className="mb-5 text-neutral-300">
              Leave a quick review.
            </DialogTitle>

            {/* <DialogDescription className="text-sm"> */}
            <StarRating reviewRating={review.rating} />
            <Textarea
              name="description"
              maxLength={150}
              rows={5}
              required
              className="leading-loose"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* </DialogDescription> */}
          </DialogHeader>
          <input type="hidden" name="id" value={review.product.id} />
          <input type="hidden" name="reviewId" value={review.id} />

          <DialogFooter>
            <SubmitButton
              text="Edit Review"
              loadingText="Editing..."
              className="bg-transparent border-2 border-neutral-300 text-neutral-300 hover:text-black hover:bg-neutral-300"
            />
          </DialogFooter>
        </FormContainer>
      </DialogContent>
    </Dialog>
  );
}

export default EditReview;
