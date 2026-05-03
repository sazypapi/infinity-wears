"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import { customOrderWithUsersAndRequest } from "./ViewCustomDetailsContainer";

import {
  createOrUpdateAdminNote,
  updateCustomOrderRequestStatus,
} from "../../utils/actions";
import { Textarea } from "@/components/ui/textarea";
function EditCustomOrderRequest({
  order,
}: {
  order: customOrderWithUsersAndRequest;
}) {
  return (
    <div className="border-t-2 border-neutral-200 pt-1 mt-3">
      <h6 className="text-xs text-neutral-600 mb-2">
        Manage Order Request Status
      </h6>
      <FormContainer action={updateCustomOrderRequestStatus}>
        <input type="hidden" name="id" value={order.id} />
        <div className="grid sm:grid-cols-3 grid-cols-2 gap-5 justify-between align-middle items-center">
          <Select defaultValue={order.status} name="status">
            <SelectTrigger className="border-2 border-black w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="SEEN">Seen</SelectItem>
              <SelectItem value="ACCEPTED">Accepted</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="DONE">Done</SelectItem>
            </SelectContent>
          </Select>

          <div className="w-full">
            <SubmitButton text="Update Status" loadingText="Updating..." />
          </div>
        </div>
      </FormContainer>
      <div className="mt-5">
        <FormContainer action={createOrUpdateAdminNote}>
          <input type="hidden" name="id" value={order.id} />
          <h6 className="text-xs text-neutral-600">
            {order.adminNote ? "Edit admin note" : "Leave a note for the user"}
          </h6>
          <p className="text-red-400 text-[10px] mb-2">
            The user will see this note
          </p>
          <Textarea
            className="border-2 border-black text-xs sm:text-sm placeholder:text-xs sm:placeholder:text-sm"
            name="adminNote"
            placeholder="Type your message here."
            defaultValue={order.adminNote ?? ""}
            required
          />
          <div className="w-full justify-end flex mt-2">
            <SubmitButton
              text={order.adminNote ? "Edit Note" : "Create Note"}
              loadingText={order.adminNote ? "Editing..." : "Creating..."}
            />
          </div>
        </FormContainer>
      </div>
    </div>
  );
}

export default EditCustomOrderRequest;
