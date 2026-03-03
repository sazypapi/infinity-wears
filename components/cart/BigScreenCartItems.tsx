import { Prisma } from "@/generated/prisma";
import Image from "next/image";
import Link from "next/link";
import SelectCartItemAmount from "./SelectAmount";
import { cn } from "@/lib/utils";
import { formatCurrency } from "../../utils/format";
import FormContainer from "../form/FormContainer";
import { IconButton } from "../form/Buttons";
import { deleteCartItem } from "../../utils/actions";
import CurrentItemDialog from "./CurrentItemDialog";

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
function BigScreenCartItems({
  cartItems,
}: {
  cartItems: CartItemWithProductAndVariant[];
}) {
  return (
    <div className="p-3 flex justify-center align-middle items-center flex-col w-full">
      <div className="flex justify-between w-full border-b border-neutral-200 pb-2 mb-2">
        <h6 className="w-24 text-neutral-600 text-xs">Product</h6>
        <h6 className="w-60 text-neutral-600 text-xs">Name</h6>
        <h6 className="w-40 text-neutral-600 text-xs">Price</h6>
        <h6 className="w-20 text-neutral-600 text-xs">Amount</h6>
        <h6 className="w-30 text-neutral-600 text-xs">Total</h6>
      </div>
      {cartItems.map((item, index) => {
        let isDiscount = false;
        if (item.discount > 0) isDiscount = true;
        return (
          <div
            key={index}
            className={`flex flex-col align-middle items-center w-full mb-3 ${
              index !== cartItems.length - 1
                ? "border-b border-b-black pb-3"
                : ""
            }`}
          >
            <div
              className={`flex justify-between align-middle items-center w-full pt-3`}
            >
              <div className="h-24 w-24 relative">
                <Image
                  src={item.variant.coverImage}
                  fill
                  className="object-cover shadow-sm rounded-lg border"
                  alt={item.product.name}
                />
              </div>
              <div className="flex flex-col justify-start w-60">
                <h2>
                  <Link
                    className="hover:underline"
                    href={`/products/${item.product.slug}`}
                  >
                    {item.product.name}
                  </Link>
                </h2>
                <CurrentItemDialog
                  itemId={item.id}
                  itemAmount={item.amount}
                  currentSize={item.size}
                  product={item.product}
                  color={item.variant.colorName}
                  size={item.size}
                  currentVariantId={item.variantId}
                />
              </div>

              {/* {Price} */}
              <div className="flex flex-col gap-1 w-40 justify-start">
                <h2
                  className={cn(
                    isDiscount
                      ? "line-through text-neutral-500 text-xs"
                      : "text-lg",
                  )}
                >
                  {formatCurrency(item.variant.price)}
                </h2>
                <h2 className="flex flex-row text-lg">
                  {isDiscount ? (
                    <>
                      {formatCurrency(
                        item.variant.price * (1 - item.discount / 100),
                      )}{" "}
                      <p className="text-red-500 text-xs">-{item.discount}%</p>
                    </>
                  ) : (
                    ""
                  )}
                </h2>
              </div>
              <div>
                <SelectCartItemAmount amount={item.amount} id={item.id} />
              </div>
              <div>
                <h2 className="text-lg  w-30">
                  {formatCurrency(
                    isDiscount
                      ? item.variant.price *
                          (1 - item.discount / 100) *
                          item.amount
                      : item.price * item.amount,
                  )}
                </h2>
              </div>
            </div>
            <div className="flex justify-end w-full">
              <FormContainer action={deleteCartItem}>
                <input type="hidden" name="id" value={item.id} />
                <IconButton actionType="delete" />
              </FormContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BigScreenCartItems;
