"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuUser } from "react-icons/lu";
import {
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
  useClerk,
} from "@clerk/nextjs";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

function UserIcon() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const toastLogout = async () => {
    await signOut();
    toast("Succesfully Logged Out");
  };
  if (isSignedIn && user) {
    const profileImage = user.imageUrl;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {profileImage ? (
            <Image
              src={profileImage}
              width={28}
              height={28}
              alt="Profile pic"
              className="sm:h-7 sm:w-7 h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="flex align-middle items-center">
              <LuUser className="h-7 w-7  bg-primary text-gray-300 rounded-full" />
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href="/" className="w-full" onClick={toastLogout}>
            <SignOutButton>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </SignOutButton>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex align-middle items-center">
          <LuUser className="h-7 w-7  bg-primary text-gray-300 rounded-full" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <SignedOut>
          <DropdownMenuItem>
            <Link href="/" prefetch={false} className="w-full">
              <SignInButton mode="modal">Login</SignInButton>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/" prefetch={false} className="w-full">
              <SignUpButton mode="modal">Register</SignUpButton>
            </Link>
          </DropdownMenuItem>
        </SignedOut>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserIcon;
