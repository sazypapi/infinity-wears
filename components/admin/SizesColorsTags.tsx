import { Button } from "@/components/ui/button";
import { Product } from "@/generated/prisma";

function SizesColorsTags({ product }: { product: Product }) {
  return (
    <div>
      <div className="mb-5">
        <p className="text-neutral-400 text-xs">SEO Tag(s)</p>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {product.seoTags.map((tag) => {
            return (
              <Button
                key={tag}
                className="border-2 mr-3 border-neutral-500 bg-transparent text-neutral-500"
              >
                {tag}
              </Button>
            );
          })}
        </div>
      </div>
      <div className="mb-5">
        <p className="text-neutral-400 text-xs">Size(s)</p>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {product.sizes.map((size) => {
            return (
              <Button
                key={size}
                className="border-2 mr-3 border-neutral-500 bg-transparent text-neutral-500"
              >
                {size}
              </Button>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-neutral-400 text-xs">Color(s)</p>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {product.colors.map((color) => {
            return (
              <Button
                key={color}
                className="border-2 mr-3 border-neutral-500 bg-transparent text-neutral-500"
              >
                {color}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SizesColorsTags;
