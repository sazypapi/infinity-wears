import { Button } from "@/components/ui/button";
import { Product } from "@/generated/prisma";

function ViewSEOTags({ product }: { product: Product }) {
  return (
    <div>
      <div className="mb-2">
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
    </div>
  );
}

export default ViewSEOTags;
