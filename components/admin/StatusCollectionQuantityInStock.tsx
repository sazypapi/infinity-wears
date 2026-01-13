import { Collection, Product } from "@/generated/prisma";
import React from "react";

function StatusCollectionQuantityInStock({
  product,
  getCollection,
}: {
  product: Product;
  getCollection: null | Collection;
}) {
  return (
    <div className="grid sm:flex grid-cols-2 justify-center w-full sm:justify-between">
      <div className="flex flex-col justify-start">
        <p className="text-neutral-400 text-xs">Status</p>
        <h4 className="text-sm text-neutral-700">{product.status}</h4>
      </div>
      <div className="flex flex-col justify-start">
        <p className="text-neutral-400 text-xs">Collection</p>
        <h4 className="text-sm text-neutral-700">
          {getCollection ? getCollection.name : "none"}
        </h4>
      </div>
      <div className="flex flex-col justify-start">
        <p className="text-neutral-400 text-xs">Quantity</p>
        <h4 className="text-sm text-neutral-700">
          {product.quantity > 0 ? product.quantity : 0}
        </h4>
      </div>
    </div>
  );
}

export default StatusCollectionQuantityInStock;
