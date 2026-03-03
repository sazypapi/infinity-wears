import { Prisma } from "@/generated/prisma";
import Image from "next/image";
import Link from "next/link";
import SmallScreenCurrentDialog from "./SmallScreenCurrentDialog";

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
  return (
    <div
      className={`flex justify-between align-middle items-center gap-3 w-full ${
        index !== length - 1 ? "border-b border-b-black pb-3" : ""
      }`}
    >
      <div className="h-20 w-20 relative">
        <Image
          src={item.variant.coverImage}
          fill
          className="object-cover shadow-sm rounded-lg border"
          alt={item.product.name}
        />
      </div>
      <div className="flex w-full flex-col align-middle items-center border-2 border-amber-400">
        <div className="flex w-full flex-col justify-end align-middle">
          <h3 className="text-base">
            <Link href={`/products/${item.product.slug}`}>
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
      </div>
    </div>
  );
}

export default SmallScreenCartItems;
