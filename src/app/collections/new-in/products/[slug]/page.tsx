import React from "react";
import {
  fetchFavoriteId,
  getProductRatings,
  getProductReviews,
  getSingleProductDetails,
  getYouMayAlsoLike,
} from "../../../../../../utils/actions";
import { auth } from "@clerk/nextjs/server";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RxValueNone } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Containers from "../../../../../../components/global/Containers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import BigScreenDetails from "../../../../../../components/product details/BigScreenDetails";
import SmallScreenDetails from "../../../../../../components/product details/SmallScreenDetails";

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const productDetails = await getSingleProductDetails(slug);
  const { userId } = await auth();
  if (!productDetails) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>Couldn&apos;t find product</EmptyTitle>
          <EmptyDescription>This product doesn&apos;t exist</EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
            <Link href="/collections/best-selling">
              Go back to Best Selling
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  const youMayAlsoLike = await getYouMayAlsoLike(slug);
  const result = await getProductRatings(productDetails.id);
  const favoriteIds = await Promise.all(
    youMayAlsoLike.map((product) =>
      userId ? fetchFavoriteId({ productId: product.id }) : null,
    ),
  );
  if ("error" in result) {
    return <div>Error loading ratings</div>;
  }
  const {
    oneStar,
    twoStar,
    threeStar,
    fourStar,
    fiveStar,
    totalRating,
    averageRating,
  } = result;
  const reviews = await getProductReviews(productDetails.id);
  if (!Array.isArray(reviews)) {
    return <div>Error loading ratings</div>;
  }
  return (
    <Containers className="py-5  px-2">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="hover:text-black duration-300 transition text-xs sm:text-sm"
              href="/">
              Infinity Wears
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              className="hover:text-black duration-300 transition text-xs sm:text-sm"
              href="/collections">
              Collections
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              className="hover:text-black duration-300 transition text-xs sm:text-sm capitalize"
              href={`/collections/new-in`}>
              New In
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="text-black capitalize text-xs sm:text-sm">
              {productDetails.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* PC */}
      <div className="hidden lg:flex">
        <BigScreenDetails
          productDetails={productDetails}
          youMayAlsoLike={youMayAlsoLike}
          averageRating={averageRating}
          fiveStar={fiveStar}
          fourStar={fourStar}
          oneStar={oneStar}
          threeStar={threeStar}
          totalRating={totalRating}
          twoStar={twoStar}
          reviews={reviews}
          favoriteIds={favoriteIds}
        />
      </div>
      {/* Tablet & Phone */}
      <div className="lg:hidden">
        <SmallScreenDetails
          productDetails={productDetails}
          averageRating={averageRating}
          fiveStar={fiveStar}
          fourStar={fourStar}
          oneStar={oneStar}
          threeStar={threeStar}
          totalRating={totalRating}
          twoStar={twoStar}
          youMayAlsoLike={youMayAlsoLike}
          reviews={reviews}
          favoriteIds={favoriteIds}
        />
      </div>
    </Containers>
  );
}
export default page;
