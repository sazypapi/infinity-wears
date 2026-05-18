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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
function AddressEditModal({ user }: { user: UserProfile }) {
  const [value, setValue] = useState(user.phone ? user.phone : "");
  const [textarea, setTextArea] = useState(user.address ? user.address : "");

  const hasAddress = user.address && user.phone;
  return (
    <Dialog>
      <DialogTrigger className="flex justify-start">
        <FiEdit />
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]   bg-black/30 backdrop-blur-sm backdrop-saturate-150
        border-t
        shadow-lg
        text-white rounded-4xl"
      >
        <DialogHeader className="my-5">
          <DialogTitle>
            {hasAddress ? "Edit Address" : "Submit Address"}
          </DialogTitle>
        </DialogHeader>
        <FormContainer action={createAddress}>
          {/* <TextArea
            name="address"
            defaultValue={user.address ? user.address : ""}
            labelText="Address"
            placeholder="Enter your address"
          /> */}
          <div className="mb-2">
            <Label
              htmlFor="address"
              className="capitalize mb-1 sm:mb-2 text-xs sm:text-sm"
            >
              Address
            </Label>
            <Textarea
              id="address"
              onChange={(e) => setTextArea(e.target.value)}
              name="address"
              value={textarea}
              rows={5}
              placeholder="enter your address"
              required
              className="leading-loose  border-2 border-gray-300 text-[16px] sm:text-sm placeholder:text-[16px] sm:placeholder:text-sm"
            />
          </div>
          {/* <FormInput
            name="phone"
            defaultValue={user.phone ? user.phone : ""}
            label="Phone Number"
            placeholder="phone no (11 digits)"
            type="text"
            required
          /> */}
          <div>
            <Label
              className="text-white capitalize mb-1 sm:mb-2 text-xs sm:text-sm"
              htmlFor="phone"
            >
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="number"
              // className="shadow-gray-300 shadow-sm/30 border-2 border-gray-300"
              className="shadow-white text-white shadow-sm/30 border-2 border-white placeholder:text-[16px] sm:placeholder:text-sm sm:text-sm text-[16px]"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="phone no (11 digits)"
              required
            />
          </div>
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
