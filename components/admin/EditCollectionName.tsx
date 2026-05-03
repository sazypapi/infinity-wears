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
import { Label } from "@/components/ui/label";
import { FiEdit } from "react-icons/fi";

import { Input } from "@/components/ui/input";
import { editCollectionName } from "../../utils/actions";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { DialogTitle } from "@radix-ui/react-dialog";
function EditCollectionName({ collection }: { collection: Collection }) {
  const [name, setName] = useState(collection.name);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-transparent border-none hover:bg-transparent text-black hover:cursor-pointer"
        >
          <FiEdit />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]   bg-black/30 backdrop-blur-sm backdrop-saturate-150
        border-t
        shadow-lg
        text-white rounded-4xl"
      >
        <FormContainer action={editCollectionName}>
          <input type="hidden" name="id" value={collection.id} />
          <DialogHeader className="my-5">
            <DialogTitle></DialogTitle>
            <div className="grid gap-4 my-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Edit Name</Label>
                <Input
                  id="name-1"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <DialogDescription className="text-sm text-neutral-300">
              To add/remove products from collection, click on{" "}
              <Link
                href={`/admin/view-collection-products/${collection.id}`}
                className="underline underline-offset-3 text-white"
              >
                {" "}
                view products
              </Link>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton
              className="bg-transparent text-white hover:bg-white hover:text-black border-white duration-500 transition"
              text="Edit Name"
            />
          </DialogFooter>
        </FormContainer>
      </DialogContent>
    </Dialog>
  );
}

export default EditCollectionName;
