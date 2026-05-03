import Link from "next/link";
import { dashboardLinks } from "../../../utils/links";
import { IoLogOutOutline } from "react-icons/io5";

export default async function DashboardPage() {
  return (
    <div>
      {/* Menu list */}
      <div className="border rounded-md overflow-hidden">
        {dashboardLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center justify-between px-4 py-4 border-b last:border-b-0 hover:bg-neutral-700 transition duration-500 hover:text-white"
          >
            <div className="flex items-center gap-3">
              {link.icon && <link.icon className="w-5 h-5" />}
              <span className="text-sm">{link.label}</span>
            </div>

            <IoLogOutOutline />
          </Link>
        ))}
      </div>
    </div>
  );
}
