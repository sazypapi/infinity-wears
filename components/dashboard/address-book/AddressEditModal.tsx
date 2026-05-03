"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiEdit } from "react-icons/fi";
import FormContainer from "../../form/FormContainer";
import { createAddress } from "../../../utils/actions";
import FormInput from "../../form/FormInput";
import { UserProfile } from "@/generated/prisma";
import TextArea from "../../form/TextArea";
import { SubmitButton } from "../../form/Buttons";
function AddressEditModal({ user }: { user: UserProfile }) {
  const hasAddress = user.address && user.phone;
  return (
    <Dialog>
      <DialogTrigger className="flex justify-start">
        <FiEdit />
      </DialogTrigger>
      <DialogContent className="bg-white rounded-xl shadow-sm border">
        <DialogHeader className="my-5">
          <DialogTitle>
            {hasAddress ? "Edit Address" : "Submit Address"}
          </DialogTitle>
        </DialogHeader>
        <FormContainer action={createAddress}>
          <TextArea
            name="address"
            defaultValue={user.address ? user.address : ""}
            labelText="Address"
            placeholder="Enter your address"
          />
          <FormInput
            name="phone"
            defaultValue={user.phone ? user.phone : ""}
            label="Phone Number"
            placeholder="phone no (11 digits)"
            type="text"
            required
          />
          <SubmitButton
            text={hasAddress ? "Edit Address" : "Submit Address"}
            className="w-full bg-white text-black hover:bg-black hover:text-white mt-5 border-2 border-black transition duration-500"
            loadingText={hasAddress ? "Editing" : "Submitting"}
          />
        </FormContainer>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddressEditModal;
