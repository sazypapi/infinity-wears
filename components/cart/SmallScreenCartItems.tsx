import { Prisma } from "@/generated/prisma";
import Image from "next/image";
import Link from "next/link";
import SmallScreenCurrentDialog from "./SmallScreenCurrentDialog";
import { formatCurrency } from "../../utils/format";
import { cn } from "@/lib/utils";
import SelectCartItemAmount from "./SelectAmount";
import FormContainer from "../form/FormContainer";
import { deleteCartItem } from "../../utils/actions";
import { IconButton } from "../form/Buttons";

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
function SmallScreenCartItems({
  item,
  length,
  index,
}: {
  item: CartItemWithProductAndVariant;
  length: number;
  index: number;
}) {
  function truncateText(text: string, maxLength: number = 20): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  }
  let isDiscount = false;
  if (item.discount > 0) isDiscount = true;
  return (
    <div
      className={`grid grid-cols-3 gap-5 pt-4 w-full align-middle items-center  ${
        index !== length - 1 ? "border-b border-b-neutral-500 pb-4" : ""
      }`}
    >
      <div className="col-span-1 h-24 w-24 relative">
        <Image
          src={item.variant.coverImage}
          fill
          className="object-cover shadow-sm rounded-lg border"
          alt={item.product.name}
        />
      </div>
      <div className="col-span-2 flex w-full flex-col align-middle items-center">
        <div className="flex w-full flex-col justify-end align-middle">
          <h3 className="text-base">
            <Link
              href={`/products/${item.product.slug}`}
              className="hover:underline"
            >
              {truncateText(item.product.name)}
            </Link>
          </h3>
          <SmallScreenCurrentDialog
            itemId={item.id}
            itemAmount={item.amount}
            currentSize={item.size}
            product={item.product}
            color={item.variant.colorName}
            size={item.size}
            currentVariantId={item.variantId}
          />
        </div>
        <div className="flex w-full justify-between align-middle items-center  mt-3">
          <div className="flex flex-row w-fit justify-start">
            <h2 className={cn(isDiscount ? "hidden" : "text-base")}>
              {formatCurrency(item.variant.price)}
            </h2>
            <h2 className={cn(isDiscount ? "text-base" : "hidden")}>
              {formatCurrency(item.variant.price * (1 - item.discount / 100))}
            </h2>
          </div>
          <SelectCartItemAmount amount={item.amount} id={item.id} />
          <div className="">
            <FormContainer action={deleteCartItem}>
              <input type="hidden" name="id" value={item.id} />
              <IconButton actionType="delete" />
            </FormContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmallScreenCartItems;
