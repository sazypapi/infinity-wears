import { Product } from "@/generated/prisma";

function NameDiscountPriceSEOTitle({ product }: { product: Product }) {
  const formatStatus = (status: string) =>
    status.charAt(0) + status.slice(1).toLowerCase();
  return (
    <div className="grid sm:grid-cols-4 grid-cols-2 sm:gap-10 gap-4">
      <div className="flex flex-col justify-start">
        <p className="text-neutral-400 text-xs">Product Name</p>
        <h4 className="text-sm text-neutral-700">{product.name}</h4>
      </div>
      <div className="flex flex-col justify-start">
        <p className="text-neutral-400 text-xs">Quantity</p>
        <h4 className="text-sm text-neutral-700">{product.quantity}</h4>
      </div>

      <div className="flex flex-col justify-start">
        <p className="text-neutral-400 text-xs">Status</p>
        <h4 className="text-sm text-neutral-700 capitalize">
          {formatStatus(product.status)}
        </h4>
      </div>
      <div className="flex flex-col justify-start">
        <p className="text-neutral-400 text-xs">SEO Title</p>
        <h4 className="text-sm text-neutral-700">{product.seoTitle}</h4>
      </div>
    </div>
  );
}

export default NameDiscountPriceSEOTitle;
