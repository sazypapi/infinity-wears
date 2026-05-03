import {
  getAllCollectionLinks,
  getCustomPieceBg,
  getHomeCarouselImages,
} from "../../utils/actions";
import { Card, CardContent } from "@/components/ui/card";

import Link from "next/link";

async function Content() {
  const carousels = await getHomeCarouselImages();
  const collectionLinks = await getAllCollectionLinks();
  const customPieceBg = await getCustomPieceBg();
  return (
    <Card className="bg-gray-200 p-2">
      <h6 className="text-xs text-neutral-600">
        Manage Content throughout the website
      </h6>
      <CardContent className="flex flex-col w-full gap-3 p-0">
        {/* HOME CAROUSEL */}
        <div className="grid grid-cols-2 sm:grid-cols-3 justify-between gap-5 text-black bg-neutral-300 p-3 rounded-md align-middle items-center">
          <h6 className="text-xs sm:text-sm truncate">Home Carousels</h6>

          {carousels.length > 0 ? (
            carousels.length === 1 ? (
              <h6 className="text-xs sm:text-sm truncate hidden sm:block">
                {carousels.length} Item
              </h6>
            ) : (
              <h6 className="text-xs sm:text-sm truncate hidden sm:block">
                {carousels.length} Items
              </h6>
            )
          ) : (
            <h6 className="text-xs sm:text-sm truncate hidden sm:block">
              No Carousel Created
            </h6>
          )}

          <Link
            className="text-xs truncate text-left underline"
            href="/admin/edit-carousel-items"
          >
            Edit Carousels
          </Link>
        </div>
        {/* COLLECTION LINK */}
        <div className="grid grid-cols-2 sm:grid-cols-3 justify-between gap-5 text-black bg-neutral-300 p-3 rounded-md align-middle items-center">
          <h6 className="text-xs sm:text-sm truncate">Collection Links</h6>

          {collectionLinks.length > 0 ? (
            collectionLinks.length === 1 ? (
              <h6 className="text-xs sm:text-sm truncate hidden sm:block">
                {collectionLinks.length} Link
              </h6>
            ) : (
              <h6 className="text-xs sm:text-sm truncate hidden sm:block">
                {collectionLinks.length} Links
              </h6>
            )
          ) : (
            <h6 className="text-xs sm:text-sm truncate hidden sm:block">
              No Link Created
            </h6>
          )}

          <Link
            className="text-xs truncate text-left underline"
            href="/admin/edit-collection-links"
          >
            Edit Collection Links
          </Link>
        </div>
        {/*CUSTOM PIECE LINK*/}
        <div className="grid grid-cols-2 sm:grid-cols-3 justify-between gap-5 text-black bg-neutral-300 p-3 rounded-md align-middle items-center">
          <h6 className="text-xs sm:text-sm truncate">
            Custom Piece Background
          </h6>
          <h6 className="text-xs sm:text-base truncate hidden sm:block">
            {customPieceBg ? "Background Created" : "Background not created"}
          </h6>

          <Link
            className="text-xs truncate text-left underline"
            href="/admin/edit-custompiece-background"
          >
            Edit Custom Piece BGGGGGGG
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default Content;
