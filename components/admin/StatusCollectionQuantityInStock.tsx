import { Collection, Product } from "@/generated/prisma";

function StatusCollectionQuantityInStock({
  product,
  getCollection,
}: {
  product: Product;
  getCollection: null | Collection;
}) {
  const formatStatus = (status: string) =>
    status.charAt(0) + status.slice(1).toLowerCase();
  return (
    <div className="grid sm:grid-cols-4 grid-cols-2 sm:gap-10 gap-4">
      <div className="flex flex-col justify-start">
        <p className="text-neutral-400 text-xs">Collection</p>
        <h4 className="text-sm text-neutral-700 capitalize">
          {getCollection ? getCollection.name : "none"}
        </h4>
      </div>
      <div className="flex flex-col justify-start">
        <p className="text-neutral-400 text-xs">Category</p>
        <h4 className="text-sm text-neutral-700">
          {formatStatus(product.category)}
        </h4>
      </div>

      <div className="flex flex-col justify-start">
        <p className="text-neutral-400 text-xs">Material</p>
        <h4 className="text-sm text-neutral-700 capitalize">
          {product.material}
        </h4>
      </div>
      <div className="flex flex-col justify-start">
        <p className="text-neutral-400 text-xs">Gender</p>
        <h4 className="text-sm text-neutral-700">
          {formatStatus(product.gender)}
        </h4>
      </div>
    </div>
  );
}

export default StatusCollectionQuantityInStock;
