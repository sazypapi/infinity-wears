"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubmitButton } from "../form/Buttons";
import FormInput from "../form/FormInput";
import { createCustomOrder } from "../../utils/actions";
import FormContainer from "../form/FormContainer";
import { Button } from "@/components/ui/button";
import { customOrderWithUsersAndRequest } from "./ViewCustomDetailsContainer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function CreateCustomOrder({
  orderRequest,
}: {
  orderRequest: customOrderWithUsersAndRequest;
}) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="whitespace-nowrap bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
            Create Order
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]   bg-black/30 backdrop-blur-sm backdrop-saturate-150
              border-t
              shadow-lg
              text-white rounded-4xl"
        >
          <FormContainer action={createCustomOrder}>
            <input type="hidden" name="requestId" value={orderRequest.id} />
            <DialogHeader className="my-5">
              <DialogTitle className="mb-5 text-neutral-300">
                Create Custom Order
              </DialogTitle>

              {/* <DialogDescription className="text-sm"> */}
              <FormInput
                name="agreedPrice"
                type="number"
                label="Agreed Price"
                placeholder="Price in naira"
                required
                className="text-white placeholder:text-neutral-200"
              />
              <Select defaultValue="IN_PRODUCTION" name="status">
                <SelectTrigger className="border-2 border-white w-full ">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IN_PRODUCTION">In Production</SelectItem>
                  <SelectItem value="READY">Ready</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                </SelectContent>
              </Select>
              {/* </DialogDescription> */}
            </DialogHeader>
            <DialogFooter>
              <SubmitButton
                text="Create Custom Order"
                loadingText="Creating..."
                className="bg-transparent border-2 hover:cursor-pointer border-neutral-300 text-neutral-300 hover:text-black hover:bg-neutral-300"
              />
            </DialogFooter>
          </FormContainer>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateCustomOrder;
