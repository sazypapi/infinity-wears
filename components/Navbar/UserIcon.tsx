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

function UserIcon({ isAdmin }: { isAdmin: boolean }) {
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();
  const toastLogout = async () => {
    await signOut();
    toast("Succesfully Logged Out");
  };
  if (!isLoaded) {
    return (
      <div className="flex align-middle items-center">
        <LuUser className="h-7 w-7 bg-primary text-gray-300 rounded-full" />
      </div>
    );
  }
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
              <LuUser className="h-7 w-7 bg-primary text-gray-300 rounded-full" />
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="top" className="z-[9999]">
          <Link href="/dashboard/account">
            <DropdownMenuItem className="active:bg-neutral-100 transition duration-150">
              My Account
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/orders">
            <DropdownMenuItem className="active:bg-neutral-100 transition duration-150">
              Orders
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/wishlist">
            <DropdownMenuItem className="active:bg-neutral-100 transition duration-150">
              Wishlist
            </DropdownMenuItem>
          </Link>
          {isAdmin && (
            <Link href="/admin">
              <DropdownMenuItem className="active:bg-neutral-100 transition duration-150">
                Admin Dashboard
              </DropdownMenuItem>
            </Link>
          )}
          <Link href="/" className="w-full" onClick={toastLogout}>
            <SignOutButton>
              <DropdownMenuItem className="active:bg-neutral-100 transition duration-150">
                Logout
              </DropdownMenuItem>
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
          <LuUser className="h-7 w-7 bg-primary text-gray-300 rounded-full" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" className="z-[9999]">
        <SignedOut>
          <DropdownMenuItem className="active:bg-neutral-100 transition duration-150">
            <Link href="/" prefetch={false} className="w-full">
              <SignInButton mode="modal">Login</SignInButton>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="active:bg-neutral-100 transition duration-150">
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
