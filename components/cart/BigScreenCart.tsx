import { Cart, Prisma, UserProfile } from "@/generated/prisma";
import BigScreenCartItems from "./BigScreenCartItems";
import BigScreenCartTotals from "./BigScreenCartTotals";

type CartItemWithProductAndVariant = Prisma.CartItemGetPayload<{
  include: {
    variant: true;
    product: {
      include: {
        variants: true;
      };
    };
  };
}>;
function BigScreenCart({
  cartItems,
  currentCart,
  userHasAddressAndPhone,
}: {
  cartItems: CartItemWithProductAndVariant[];
  currentCart: Cart;
  userHasAddressAndPhone: UserProfile | null;
}) {
  return (
    <div className="grid grid-cols-3 gap-10 w-full">
      <div className="col-span-2 border-2 shadow-sm rounded-sm px-2 py-10">
        <BigScreenCartItems cartItems={cartItems} />
      </div>
      <div className="col-span-1 border-2 shadow-sm rounded-sm px-2 py-10 h-fit">
        <BigScreenCartTotals
          currentCart={currentCart}
          userHasAddressAndPhone={userHasAddressAndPhone}
        />
      </div>
    </div>
  );
}

export default BigScreenCart;
