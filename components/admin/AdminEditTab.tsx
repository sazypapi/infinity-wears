import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditProductDetails from "./EditProductDetails";
import { Collection, Product } from "@/generated/prisma";
import EditImageContainer from "./EditImageContainer";

function AdminEditTab({
  product,
  getCollection,
  collectionName,
  existingCollections,
}: {
  product: Product;
  getCollection: Collection | null;
  collectionName: string | undefined;
  existingCollections: string[];
}) {
  return (
    <div>
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <EditProductDetails
            existingCollections={existingCollections}
            product={product}
            collectionName={collectionName}
          />
        </TabsContent>
        <TabsContent value="images">
          <EditImageContainer product={product} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminEditTab;
