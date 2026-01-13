import { getSingleProduct } from "../../../../../utils/actions";
import { PiEmptyBold } from "react-icons/pi";
import Containers from "../../../../../components/global/Containers";
import ViewproductsHeader from "../../../../../components/admin/ViewProductsHeader";
import ViewProductBody from "../../../../../components/admin/ViewProductBody";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
async function ViewProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { product, getCollection } = await getSingleProduct(id);
  if (!product) {
    return (
      <Containers className="h-[70vh] sm:mt-14 flex align-middle items-center justify-center">
        <div>
          <h1 className="flex items-center justify-center align-middle text-neutral-500 text-3xl">
            <PiEmptyBold /> No such product
          </h1>
        </div>
      </Containers>
    );
  }
  return (
    <Containers className="py-10 sm:py-15 sm:mt-14">
      <Breadcrumb className="mb-4">
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
              {product.name} collection
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ViewproductsHeader slug={product.slug} id={product.id} />
      <ViewProductBody product={product} getCollection={getCollection} />
    </Containers>
  );
}

export default ViewProductPage;
