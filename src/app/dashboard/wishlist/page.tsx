import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import WishlistList from "../../../../components/dashboard/wishlist/WishlistList";
import { getWishlist } from "../../../../utils/actions";
import { RxValueNone } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function Wishlist() {
  const wishlist = await getWishlist();
  if (wishlist.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>Your wishlist is empty</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t liked any products yet
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
            <Link href="/shop">Go to Shop</Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }
  return (
    <div>
      <WishlistList wishlist={wishlist} />
    </div>
  );
}

export default Wishlist;
