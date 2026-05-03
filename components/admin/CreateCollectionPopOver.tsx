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
import { createCollection } from "../../utils/actions";
import FormContainer from "../form/FormContainer";
import { Button } from "@/components/ui/button";
function CreateCollectionPopOver({ component }: { component: string }) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          {component === "No Product" ? (
            <Button className="whitespace-nowrap bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
              Create Collection
            </Button>
          ) : (
            <button className="whitespace-nowrap text-neutral-600 shadow-lg text-xs hover:bg-neutral-500 hover:text-white border-2 border-neutral-500 transition duration-500 py-1 px-2 rounded-lg">
              Create Collection
            </button>
          )}
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]   bg-black/30 backdrop-blur-sm backdrop-saturate-150
            border-t
            shadow-lg
            text-white rounded-4xl"
        >
          <FormContainer action={createCollection}>
            <DialogHeader className="my-5">
              <DialogTitle className="mb-5 text-neutral-300">
                Create Collection
              </DialogTitle>

              {/* <DialogDescription className="text-sm"> */}
              <FormInput
                name="name"
                type="text"
                label="Collection Name"
                placeholder="name"
                required
                className="text-white placeholder:text-neutral-400"
              />
              {/* <div>
                <Label className="capitalize mb-2" htmlFor="name">
                  Collection Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  // className="shadow-gray-300 shadow-sm/30 border-2 border-gray-300"
                  className="shadow-gray-300 shadow-sm/30 border-2 border-gray-300 text-white"
                  placeholder="name"
                  required
                />
              </div> */}
              {/* </DialogDescription> */}
            </DialogHeader>
            <DialogFooter>
              <SubmitButton
                text="Create Collection"
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

export default CreateCollectionPopOver;
