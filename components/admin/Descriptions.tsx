import { Product } from "@/generated/prisma";

function Descriptions({ product }: { product: Product }) {
  return (
    <>
      <div className="flex flex-col justify-start">
        <p className="text-neutral-400 text-xs">Product Description</p>
        <h4 className="text-sm text-neutral-700">{product.description}</h4>
      </div>
      <div className="flex flex-col justify-start">
        <p className="text-neutral-400 text-xs">SEO Description</p>
        <h4 className="text-sm text-neutral-700">{product.seoDescription}</h4>
      </div>
    </>
  );
}

export default Descriptions;
