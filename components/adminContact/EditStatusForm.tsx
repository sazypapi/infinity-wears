"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Contact } from "@/generated/prisma";
import { useState } from "react";
import FormContainer from "../form/FormContainer";
import { editMessageStatus } from "../../utils/actions";
import { SubmitButton } from "../form/Buttons";

function EditStatusForm({ message }: { message: Contact }) {
  const [attendedTo, setAttendedTo] = useState(message.attendedTo);

  return (
    <div className="mt-5">
      <FormContainer action={editMessageStatus}>
        <input type="hidden" name="id" value={message.id} />
        <input
          type="hidden"
          name="attendedTo"
          value={attendedTo ? "true" : "false"}
        />
        <h6 className="text-xs text-neutral-600 underline">Edit Status</h6>
        <div className="flex items-center justify-center flex-col gap-3 mt-5">
          <div className="flex items-center gap-3">
            <Label
              className="text-xs sm:text-base text-neutral-600"
              htmlFor="attendedToCheckbox">
              Attended To
            </Label>
            <Checkbox
              name="attendedToCheckbox"
              checked={attendedTo}
              onCheckedChange={(checked) => setAttendedTo(checked === true)}
              className="shadow-gray-300 shadow-sm/30 border-2 border-black"
            />
          </div>
          <SubmitButton text="Edit Status" loadingText="Editing..." />
        </div>
      </FormContainer>
    </div>
  );
}

export default EditStatusForm;
