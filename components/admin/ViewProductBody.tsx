import { Card } from "@/components/ui/card";
import { Collection, Product } from "@/generated/prisma";
import NameDiscountPriceSEOTitle from "./NameDiscountPriceSEOTitle";
import Descriptions from "./Descriptions";
import StatusCollectionQuantityInStock from "./StatusCollectionQuantityInStock";
import SizesColorsTags from "./SizesColorsTags";
import ViewImages from "./ViewImages";

function ViewProductBody({
  product,
  getCollection,
}: {
  product: Product;
  getCollection: null | Collection;
}) {
  return (
    <Card className="w-full bg-white border-2 justify-center mt-5 px-3 border-gray-200">
      <NameDiscountPriceSEOTitle product={product} />
      <Descriptions product={product} />
      <SizesColorsTags product={product} />
      <StatusCollectionQuantityInStock
        product={product}
        getCollection={getCollection}
      />
      <ViewImages product={product} />
    </Card>
  );
}

export default ViewProductBody;
