import Link from "next/link";
import { ProductWithVariants } from "./ProductDetailsSmallScreen";
import { formatCategory } from "../../utils/format-categoryName";

function SmallScreenLastDetails({
  productDetails,
}: {
  productDetails: ProductWithVariants;
}) {
  const formatStatus = (status: string) =>
    status.charAt(0) + status.slice(1).toLowerCase();
  return (
    <div className="flex flex-col align-middle items-center justify-center mt-10 shadow-sm  rounded-2xl p-3 border">
      <div>
        <h2 className="text-sm text-neutral-600">Description</h2>
        <p className=" text-xs">{productDetails.description}</p>
      </div>
      {/* GENDER CATEGORY METARIAL */}
      <div className="grid grid-cols-3 mt-5 w-full">
        <div className="flex justify-start flex-col">
          <p className="text-xs text-neutral-600">Category: </p>
          <span className="text-black text-xs underline">
            <Link
              href={`/collections/category/${productDetails.category.toLowerCase()}`}>
              {[formatCategory(productDetails.category)]}
            </Link>
          </span>
        </div>
        <div className="flex justify-start flex-col">
          <p className="text-xs text-neutral-600">Material: </p>
          <span className="text-black text-xs">
            {[productDetails.material]}
          </span>
        </div>
        <div className="flex justify-start flex-col">
          <p className="text-xs text-neutral-600">Gender: </p>
          <span className="text-black text-xs underline">
            <Link
              href={`/collections/gender/${productDetails.gender.toLowerCase()}`}>
              {[formatStatus(productDetails.gender)]}
            </Link>{" "}
          </span>
        </div>
      </div>
      {/* TAGS */}
      <div className="flex justify-start flex-col mt-4 w-full">
        <p className="text-xs text-neutral-600">Tags: </p>
        <div className="flex ">
          <span className="text-black text-xs">
            {[productDetails.seoTags[0]]}
          </span>

          <span className="text-black text-xs">
            {productDetails.seoTags[1] ? (
              <>, {[productDetails.seoTags[1]]}</>
            ) : (
              ""
            )}
          </span>

          <span className="text-black text-xs">
            {productDetails.seoTags[2] ? (
              <>, {[productDetails.seoTags[2]]}</>
            ) : (
              ""
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SmallScreenLastDetails;
