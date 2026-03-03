import {
  getAllCollections,
  getSingleProduct,
} from "../../../../../utils/actions";
import Containers from "../../../../../components/global/Containers";
import { PiEmptyBold } from "react-icons/pi";
import AdminEditTab from "../../../../../components/admin/AdminEditTab";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { product, getCollection } = await getSingleProduct(id);
  const allCollections = await getAllCollections();
  const collectionsMap: string[] = allCollections.map(
    (collection) => collection.name,
  );
  const collectionName = getCollection?.name;
  if (!product) {
    return (
      <Containers className="h-[70vh] flex align-middle items-center justify-center">
        <div>
          <h1 className="flex items-center justify-center align-middle text-neutral-500 text-3xl">
            <PiEmptyBold /> No such product
          </h1>
        </div>
      </Containers>
    );
  }
  return (
    <Containers className="py-5 sm:mt-15 px-2">
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
            <BreadcrumbLink
              className="hover:text-black duration-300 transition"
              href={`/admin/view-product/${product.slug}`}
            >
              {product.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-black  capitalize">
              Edit {product.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-bold mb-8 capitalize">edit product</h1>
      <AdminEditTab
        existingCollections={collectionsMap}
        product={product}
        getCollection={getCollection}
        collectionName={collectionName}
        variants={product.variants}
      />
    </Containers>
  );
}

export default EditProduct;
