import { BsShop } from "react-icons/bs";
import { RiShoppingCart2Line } from "react-icons/ri";
import UserIcon from "../Navbar/UserIcon";
import BottomNavSearchPopover from "./BottomNavSearchPopover";
import Link from "next/link";

function BottomNav({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div className="flex justify-center w-full items-center z-100">
      <div className="fixed bottom-[1vh] w-[90%] sm:w-[50%] px-5 py-4 h-15 flex justify-between items-center bg-black/30 backdrop-blur-md backdrop-saturate-150 border-t shadow-lg text-white rounded-4xl">
        <Link href="/shop">
          <BsShop className="h-9 w-9 text-white" />
        </Link>
        <BottomNavSearchPopover />
        <Link href="/cart">
          <RiShoppingCart2Line className="h-9 w-9 text-white" />
        </Link>
        <UserIcon isAdmin={isAdmin} />
      </div>
    </div>
  );
}

export default BottomNav;
