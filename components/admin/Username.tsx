"use client";
import { useUser } from "@clerk/nextjs";

function Username() {
  const user = useUser();
  return (
    <h2 className="text-2xl font-bold align-middle flex">
      Welcome {user.user?.firstName}
    </h2>
  );
}

export default Username;
