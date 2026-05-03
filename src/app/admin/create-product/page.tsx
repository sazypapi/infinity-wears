import CreateProductCard from "../../../../components/admin/CreateProductCard";
import Containers from "../../../../components/global/Containers";
import { getAllCollections } from "../../../../utils/actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
async function CreateProduct() {
  const allCollections = await getAllCollections();
  const collectionsMap: string[] = allCollections.map(
    (collection) => collection.name,
  );
  return (
    <Containers className="py-5 px-2">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="hover:text-black duration-300 transition"
              href="/admin"
            >
              Admin Page
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-black  capitalize">
              Create Product
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-bold mb-8 capitalize">create product</h1>

      <CreateProductCard existingCollections={collectionsMap} />
    </Containers>
  );
}

export default CreateProduct;
