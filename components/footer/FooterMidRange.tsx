import Link from "next/link";
import CollectionsDropdown from "../Navbar/CollectionsDropdown";

function FooterMidRange() {
  return (
    <div className="flex justify-center items-center gap-15 mb-4">
      <Link href="/">Home</Link>
      <Link href="/">About</Link>
      <Link href="/">Shop</Link>
      <CollectionsDropdown />
    </div>
  );
}

export default FooterMidRange;
