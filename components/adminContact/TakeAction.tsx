import { Button } from "@/components/ui/button";
import { Contact } from "@/generated/prisma";
import { HiOutlineMail } from "react-icons/hi";
import { LuPhoneCall } from "react-icons/lu";

function TakeAction({ message }: { message: Contact }) {
  return (
    <div className="mt-5">
      <h6 className="text-xs text-neutral-600 underline">Take Action</h6>
      <div className="flex items-center justify-center gap-3 mt-5">
        <a href={`tel:${message.phoneNumber}`}>
          <Button className="bg-white text-black hover:bg-black hover:text-white border-2 border-black transition duration-500">
            <LuPhoneCall /> Call Customer
          </Button>
        </a>
        <a href={`mailto:${message.email}`}>
          <Button className="bg-white text-black hover:bg-black hover:text-white border-2 border-black transition duration-500">
            <HiOutlineMail />
            Email Customer
          </Button>
        </a>
      </div>
    </div>
  );
}

export default TakeAction;
