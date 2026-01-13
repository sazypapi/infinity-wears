import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import FormContainer from "../form/FormContainer";
import { deleteProduct } from "../../utils/actions";
import { SubmitButton } from "../form/Buttons";

function ViewproductsHeader({ slug, id }: { slug: string; id: string }) {
  return (
    <div className="flex justify-between w-full">
      <Button
        asChild
        variant="link"
        className="text-neutral-950 bg-transparent border-black border-2 hover:bg-black hover:text-white transition duration-500"
      >
        <Link href={`/admin/edit-product/${slug}`}>
          <FaRegEdit /> Edit Product
        </Link>
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="text-neutral-950 bg-transparent border-black border-2 hover:bg-black hover:text-white transition duration-500"
          >
            <MdDelete />
            Delete Product
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]   bg-black/30 backdrop-blur-sm backdrop-saturate-150
        border-t
        shadow-lg
        text-white rounded-4xl"
        >
          <FormContainer action={deleteProduct}>
            <input type="hidden" name="id" value={id} />
            <DialogTitle>
              Are you sure you want to delete this product
            </DialogTitle>
            <DialogHeader className="my-5">
              <DialogDescription>
                Once deleted, product can't be recovered
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
                text="Delete Product"
                loadingText="Deleting Product"
              />
            </DialogFooter>
          </FormContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ViewproductsHeader;
