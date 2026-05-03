"use client";
import { Collection } from "@/generated/prisma";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";

import { deleteCollection } from "../../utils/actions";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { AiFillDelete } from "react-icons/ai";
function DeleteCollection({ collection }: { collection: Collection }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-transparent border-none hover:bg-transparent text-black hover:cursor-pointer"
        >
          <AiFillDelete />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]   bg-black/30 backdrop-blur-sm backdrop-saturate-150
        border-t
        shadow-lg
        text-white rounded-4xl"
      >
        <FormContainer action={deleteCollection}>
          <input type="hidden" name="id" value={collection.id} />
          <DialogHeader className="my-5">
            <DialogTitle>Once Deleted,</DialogTitle>

            <DialogDescription className="text-sm">
              Once this collection is deleted, all products that belong to it
              will no longer have a collection name. This action cannot be
              undone, and the collection name cannot be recovered.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton
              className="bg-transparent text-red-300 hover:bg-red-600 hover:text-white border-red-600"
              text="Delete Collection"
            />
          </DialogFooter>
        </FormContainer>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteCollection;
