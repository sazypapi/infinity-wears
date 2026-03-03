import { Product } from "@/generated/prisma";

function ViewImages({ product }: { product: Product }) {
  return (
    <div>
      <div>
        <p className="text-neutral-400 text-xs mb-3">Product Images</p>
        <div className="grid sm:grid-cols-6 grid-cols-3 gap-3">
          {product.images.map((image) => (
            <img
              key={image}
              src={image}
              alt="Preview"
              className="w-28 h-28 object-cover rounded-lg border"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewImages;
