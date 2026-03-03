import { Cart, Prisma } from "@/generated/prisma";
import CheckoutPopOver from "./CheckoutPopOver";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SmallScreenCartItems from "./SmallScreenCartItems";
import SmallScreenCartTotals from "./SmallScreenCartTotals";
import Header from "./Header";

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
function SmallScreenCart({
  cartItems,
  currentCart,
}: {
  cartItems: CartItemWithProductAndVariant[];
  currentCart: Cart;
}) {
  const length = cartItems.length;
  return (
    <div className="w-full flex flex-col gap-10 mt-4">
      <div>
        <ScrollArea className="h-90 w-full p-3 rounded-md border-2 border-neutral-200">
          <div className="flex flex-col gap-5 align-middle items-center justify-center">
            {cartItems.map((item, index) => {
              return (
                <SmallScreenCartItems
                  item={item}
                  index={index}
                  length={length}
                />
              );
            })}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
      <div className="border-2 rounded-md border-neutral-200 shadow-2xs">
        <SmallScreenCartTotals currentCart={currentCart} />
      </div>
    </div>
  );
}

export default SmallScreenCart;
