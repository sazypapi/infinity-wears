import {
  getSelectedProducts,
  getSingleCollection,
} from "../../../../../utils/actions";
import Containers from "../../../../../components/global/Containers";
import RemoveProductsFromCollection from "../../../../../components/admin/RemoveProductsFromCollection";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AddProductsToCollection from "../../../../../components/admin/AddProductsToCollection";
import CreateCollectionPopOver from "../../../../../components/admin/CreateCollectionPopOver";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RxValueNone } from "react-icons/rx";
async function ViewCollectionProducts({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const collection = await getSingleCollection(id);
  const allCollections = await getSelectedProducts(id);
  if (!collection) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>Error fetching collection</EmptyTitle>
          <EmptyDescription>
            We didn't find the collection you were looking for
          </EmptyDescription>
          <EmptyContent className="flex-row justify-center gap-2">
            <CreateCollectionPopOver component="No Product" />
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    );
  }
  return (
    <Containers className="py-5 px-2">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="hover:text-black duration-300 transition text-xs sm:text-sm"
              href="/admin"
            >
              Admin Page
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-black  capitalize text-xs sm:text-sm">
              {collection.name} collection
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="capitalize sm:text-4xl text-xl text-neutral-500">
        {collection?.name} collection
      </h1>
      <Tabs defaultValue="add" className="mt-3">
        <TabsList>
          <TabsTrigger value="add">Add Product</TabsTrigger>
          <TabsTrigger value="remove">Remove Product</TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <Card className="w-full bg-white border-2 justify-center mt-5 px-5 border-gray-200">
            <AddProductsToCollection
              products={allCollections}
              id={collection?.id}
            />
          </Card>
        </TabsContent>
        <TabsContent value="remove">
          <Card className="w-full bg-white border-2 justify-center mt-5 px-5 border-gray-200">
            <RemoveProductsFromCollection
              products={collection?.products ?? []}
              id={collection?.id}
            />
          </Card>
        </TabsContent>
      </Tabs>
    </Containers>
  );
}

export default ViewCollectionProducts;
