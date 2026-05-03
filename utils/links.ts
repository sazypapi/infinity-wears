type Navlink = {
  href: string;
  label: string;
  icon?: IconType;
};
import { MdOutlineRateReview } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import { FiScissors } from "react-icons/fi";

import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { CiBoxes } from "react-icons/ci";
import { FaRegAddressCard } from "react-icons/fa";
export const links: Navlink[] = [
  { href: "/new-in", label: "New In" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
];
export const dashboardLinks: Navlink[] = [
  { href: "/dashboard/account", label: "Account", icon: FaRegUser },
  { href: "/dashboard/orders", label: "Orders", icon: CiBoxes },

  { href: "/dashboard/wishlist", label: "Wishlist", icon: FaRegHeart },
  {
    href: "/dashboard/pending-reviews",
    label: "Pending Reviews",
    icon: MdOutlineRateReview,
  },
  {
    href: "/dashboard/custom-orders",
    label: "Custom Orders",
    icon: FiScissors,
  },
  { href: "/dashboard/reviews", label: "Reviews", icon: MdRateReview },
  {
    href: "/dashboard/address-book",
    label: "Address Book",
    icon: FaRegAddressCard,
  },
];
export const adminLinks: Navlink[] = [
  { href: "/admin/", label: "Account", icon: FaRegUser },
  { href: "/dashboard/orders", label: "Orders", icon: CiBoxes },
  { href: "/dashboard/wishlist", label: "Wishlist", icon: FaRegHeart },
  {
    href: "/dashboard/pending-reviews",
    label: "Pending Reviews",
    icon: MdOutlineRateReview,
  },
  { href: "/dashboard/reviews", label: "Reviews", icon: MdRateReview },
  {
    href: "/dashboard/address-book",
    label: "Address Book",
    icon: FaRegAddressCard,
  },
];
