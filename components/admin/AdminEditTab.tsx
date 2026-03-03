import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditProductDetails from "./EditProductDetails";
import { Collection, ColorVariant, Product } from "@/generated/prisma";
import EditImageContainer from "./EditImageContainer";
import EditVariantCards from "./EditVariantCards";
function AdminEditTab({
  product,
  getCollection,
  collectionName,
  existingCollections,
  variants,
}: {
  product: Product;
  getCollection: Collection | null;
  collectionName: string | undefined;
  existingCollections: string[];
  variants: ColorVariant[];
}) {
  return (
    <div>
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="variant">Variants</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <EditProductDetails
            variants={variants}
            existingCollections={existingCollections}
            product={product}
            collectionName={collectionName}
          />
        </TabsContent>
        <TabsContent value="images">
          <EditImageContainer product={product} />
        </TabsContent>
        <TabsContent value="variant">
          <EditVariantCards productId={product.id} productVariants={variants} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminEditTab;
