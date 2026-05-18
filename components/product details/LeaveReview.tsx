"use client";
import { SubmitButton } from "../form/Buttons";
import { createReview } from "../../utils/actions";
import FormContainer from "../form/FormContainer";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import StarRating from "./StarRating";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
function LeaveReview({ productId }: { productId: string }) {
  const { isSignedIn } = useUser();
  const [description, setDescription] = useState("");
  const pathName = usePathname();
  return (
    <>
      <Dialog>
        <DialogTrigger
          asChild
          className="flex justify-center align-middle items-center"
        >
          {isSignedIn ? (
            <Button className="text-black shadow-lghover:bg-black text-xs hover:text-white border-2 border-black transition duration-500 bg-transparent py-1 px-2">
              Leave Review
            </Button>
          ) : (
            <Button
              asChild
              className="text-black shadow-lghover:bg-black hover:text-white border-2 border-black transition duration-500 bg-transparent"
            >
              <SignInButton>Leave Review</SignInButton>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]   bg-black/30 backdrop-blur-sm backdrop-saturate-150
            border-t
            shadow-lg
            text-white rounded-4xl"
        >
          <FormContainer action={createReview}>
            <DialogHeader className="my-5">
              <DialogTitle className="mb-5 text-neutral-300">
                Leave a quick review.
              </DialogTitle>

              {/* <DialogDescription className="text-sm"> */}
              <StarRating />
              <Textarea
                name="description"
                maxLength={150}
                rows={5}
                required
                className="leading-loose  border-2 border-white text-[16px] sm:text-sm placeholder:text-[16px] sm:placeholder:text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {/* </DialogDescription> */}
            </DialogHeader>
            <input type="hidden" name="id" value={productId} />
            <input type="hidden" name="pathName" value={pathName} />
            <DialogFooter>
              <SubmitButton
                text="Leave Review"
                loadingText="Creating..."
                className="bg-transparent border-2 border-white text-white hover:text-black hover:bg-white"
              />
            </DialogFooter>
          </FormContainer>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default LeaveReview;
