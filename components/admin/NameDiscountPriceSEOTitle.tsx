import { Product } from "@/generated/prisma";
import { formatCurrency } from "../../utils/format";

function NameDiscountPriceSEOTitle({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-4 sm:gap-30 sm:flex-row sm:justify-between">
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-col justify-start">
          <p className="text-neutral-400 text-xs">Product Name</p>
          <h4 className="text-sm text-neutral-700">{product.name}</h4>
        </div>
        <div className="flex flex-col justify-start">
          <p className="text-neutral-400 text-xs">Discount</p>
          <h4 className="text-sm text-neutral-700">
            {product.discount ? product.discount : 0}%
          </h4>
        </div>
      </div>
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-col justify-start">
          <p className="text-neutral-400 text-xs">Price</p>
          <h4 className="text-sm text-neutral-700">
            {formatCurrency(product.price)}
          </h4>
        </div>
        <div className="flex flex-col justify-start">
          <p className="text-neutral-400 text-xs text-right">SEO Title</p>
          <h4 className="text-sm text-neutral-700">{product.seoTitle}</h4>
        </div>
      </div>
    </div>
  );
}

export default NameDiscountPriceSEOTitle;
