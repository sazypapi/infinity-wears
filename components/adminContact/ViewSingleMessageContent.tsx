import { Label } from "@/components/ui/label";
import { Contact } from "@/generated/prisma";

function ViewSingleMessageContent({ message }: { message: Contact }) {
  return (
    <>
      <div className="mt-5 grid grid-cols-1 sm:gap-y-5 sm:grid-cols-2 gap-y-3">
        <div>
          <Label className="text-[10px] sm:text-xs text-neutral-600 capitalize">
            Name
          </Label>
          <p className="text-sm sm:text-base">{message.name}</p>
        </div>
        <div>
          <Label className="text-[10px] sm:text-xs text-neutral-600">
            Status
          </Label>
          <p className="text-sm sm:text-base">
            {message.attendedTo ? "Attended To" : "Pending"}
          </p>
        </div>
        <div>
          <Label className="text-[10px] sm:text-xs text-neutral-600">
            Phone
          </Label>
          <p className="text-sm sm:text-base">{message.phoneNumber}</p>
        </div>
        <div>
          <Label className="text-[10px] sm:text-xs text-neutral-600">
            Email
          </Label>
          <p className="text-sm sm:text-base">{message.email}</p>
        </div>
      </div>
      <div className="flex flex-col justify-start mt-5">
        <Label className="text-[10px] sm:text-xs text-neutral-600">Email</Label>
        <p className="text-sm sm:text-base">{message.message}</p>
      </div>
    </>
  );
}

export default ViewSingleMessageContent;
