import { currentUser } from "@clerk/nextjs/server";
import { createOrGetUser } from "../../../../utils/actions";
import { redirect } from "next/navigation";
import AddressContainer from "../../../../components/dashboard/address-book/AddressContainer";

async function AddressBook() {
  const userProfile = await createOrGetUser();
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }
  return (
    <div className="p-5">
      <h2 className="text-2xl">Account Overview</h2>
      <AddressContainer
        user={userProfile}
        email={user.emailAddresses[0].emailAddress}
        firstName={user.firstName!}
        lastName={user.lastName!}
      />
    </div>
  );
}

export default AddressBook;
