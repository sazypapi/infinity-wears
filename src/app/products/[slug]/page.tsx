import React from "react";
import {
  getSingleProductDetails,
  getYouMayAlsoLike,
} from "../../../../utils/actions";
import Containers from "../../../../components/global/Containers";
import BigScreenDetails from "../../../../components/product details/BigScreenDetails";
import { PiEmptyBold } from "react-icons/pi";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SmallScreenDetails from "../../../../components/product details/SmallScreenDetails";
import Footer from "../../../../components/footer/Footer";
async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const productDetails = await getSingleProductDetails(slug);

  if (!productDetails) {
    return (
      <>
        <Containers className="h-[70vh] sm:mt-14 flex align-middle items-center justify-center">
          <div>
            <h1 className="flex items-center justify-center align-middle text-neutral-500 text-3xl">
              <PiEmptyBold /> No such product
            </h1>
          </div>
        </Containers>
        <Footer />
      </>
    );
  }
  const youMayAlsoLike = await getYouMayAlsoLike(slug);
  return (
    <Containers className="py-5 lg:mt-15 px-2">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="hover:text-black duration-300 transition"
              href="/"
            >
              Infinity Wears
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-black  capitalize">
              {productDetails.name} collection
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* PC */}
      <div className="hidden lg:flex">
        <BigScreenDetails
          productDetails={productDetails}
          youMayAlsoLike={youMayAlsoLike}
        />
      </div>
      {/* Tablet & Phone */}
      <div className="lg:hidden">
        <SmallScreenDetails
          productDetails={productDetails}
          youMayAlsoLike={youMayAlsoLike}
        />
      </div>
    </Containers>
  );
}

export default ProductDetailsPage;
