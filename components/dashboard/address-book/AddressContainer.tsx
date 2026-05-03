import { UserProfile } from "@/generated/prisma";
import AddressEditModal from "./AddressEditModal";

function AddressContainer({
  user,
  firstName,
  lastName,
  email,
}: {
  user: UserProfile;
  firstName: string;
  lastName: string;
  email: string;
}) {
  return (
    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
      {/* {details} */}
      <div className="rounded-sm border-2 border-neutral-200 p-2">
        <h6 className="text-neutral-400 text-xs">Details</h6>
        <div className="mt-3">
          <h5>
            {firstName} {lastName}
          </h5>
          <h5 className="mt-2 text-neutral-600 text-sm">{email}</h5>
        </div>
      </div>
      {/* {ADDRESS} */}
      <div className="rounded-sm border-2 border-neutral-200 p-2">
        <div className="flex justify-between align-middle items-center">
          <h6 className="text-neutral-400 text-xs">Address Book</h6>
          <AddressEditModal user={user} />
        </div>
        <div className="mt-3">
          {!user.address ? (
            <h5 className="text-sm text-neutral-400 border-b-2 border-neutral-200  w-fit">
              You have no saved address
            </h5>
          ) : (
            <h5 className="text-sm text-neutral-600 border-b-2 border-neutral-200  w-fit">
              {user.address}
            </h5>
          )}
          {!user.phone ? (
            <h5 className="text-sm text-neutral-400">
              You have no saved phone number
            </h5>
          ) : (
            <h5 className="text-sm text-neutral-600">{user.phone}</h5>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddressContainer;
