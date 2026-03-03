import { Card } from "@/components/ui/card";
import { Collection, ColorVariant, Product } from "@/generated/prisma";
import NameDiscountPriceSEOTitle from "./NameDiscountPriceSEOTitle";
import Descriptions from "./Descriptions";
import StatusCollectionQuantityInStock from "./StatusCollectionQuantityInStock";

import ViewImages from "./ViewImages";
import ViewSEOTags from "./ViewSEOTags";
import ViewVariants from "./ViewVariants";

function ViewProductBody({
  product,
  getCollection,
  variants,
}: {
  product: Product;
  getCollection: null | Collection;
  variants: ColorVariant[];
}) {
  return (
    <Card className="w-full bg-white border-2 justify-center mt-5 px-3 border-gray-200">
      <NameDiscountPriceSEOTitle product={product} />
      <Descriptions product={product} />

      <ViewSEOTags product={product} />
      <StatusCollectionQuantityInStock
        product={product}
        getCollection={getCollection}
      />
      <ViewVariants variants={variants} />
      <ViewImages product={product} />
    </Card>
  );
}

export default ViewProductBody;
