import { SubmitButton } from "../form/Buttons";
import FormInput from "../form/FormInput";
import { createCollection, createReview } from "../../utils/actions";
import FormContainer from "../form/FormContainer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import StarRating from "./StarRating";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
function LeaveReview({ productId }: { productId: string }) {
  const [description, setDescription] = useState("");
  return (
    <>
      <Dialog>
        <DialogTrigger
          asChild
          className="flex justify-center align-middle items-center"
        >
          <Button className="text-black shadow-lghover:bg-black hover:text-white border-2 border-black transition duration-500 bg-transparent">
            Leave Review
          </Button>
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
                className="leading-loose"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {/* </DialogDescription> */}
            </DialogHeader>
            <input type="hidden" name="id" value={productId} />
            <DialogFooter>
              <SubmitButton
                text="Leave Review"
                loadingText="Creating..."
                className="bg-transparent border-2 border-neutral-300 text-neutral-300 hover:text-black hover:bg-neutral-300"
              />
            </DialogFooter>
          </FormContainer>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default LeaveReview;
