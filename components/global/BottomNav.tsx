// BottomNav.tsx
import { BsShop } from "react-icons/bs";
import { RiShoppingCart2Line } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import UserIcon from "../Navbar/UserIcon";

function BottomNav({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div className="flex justify-center w-full items-center z-50">
      <div className="fixed bottom-[1vh] w-[90%] sm:w-[50%] px-5 py-4 h-15 flex justify-between items-center bg-black/30 backdrop-blur-md backdrop-saturate-150 border-t shadow-lg text-white rounded-4xl">
        <BsShop className="h-9 w-9 text-white" />
        <IoMdSearch className="h-9 w-9 text-white" />
        <RiShoppingCart2Line className="h-9 w-9 text-white" />
        <UserIcon isAdmin={isAdmin} />
      </div>
    </div>
  );
}

export default BottomNav;
