import { Prisma } from "@/generated/prisma";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { formatDateMonthAndYear } from "../../../utils/format";
import LeaveReview from "../../product details/LeaveReview";

type PendingReview = Prisma.OrderItemGetPayload<{
  include: {
    order: true;
  };
}>;

const fallbackImg =
  "https://files.edgestore.dev/ij70l6t4xyeuequ7/publicFiles/_public/5f763aab-7527-4a54-9b07-c9d1785e1f4a.jpg";

function PendingReviewsContainer({
  pendingReviews,
}: {
  pendingReviews: PendingReview[];
}) {
  const shortId = (item: PendingReview) =>
    item.orderId.slice(0, 10).toUpperCase();

  return (
    <div className="flex flex-col w-full">
      {pendingReviews.map((item, index) => (
        <div
          key={item.id}
          className={`flex flex-col  ${
            index !== pendingReviews.length - 1
              ? "border-b-2 border-neutral-200"
              : ""
          }`}
        >
          <div
            className={`grid grid-cols-3 items-center w-full p-3 gap-0 sm:gap-3 justify-between`}
          >
            {/* Image */}
            <div className="h-16 w-16 sm:h-24 sm:w-24 shrink-0 relative overflow-hidden rounded-lg col-span-1">
              <Image
                src={item.imageUrl || fallbackImg}
                fill
                className="object-cover"
                alt={item.name}
              />
            </div>

            {/* Info */}
            <div className="flex sm:flex-row justify-between gap-3 col-span-2">
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <h2 className="text-sm truncate">{item.name}</h2>
                <p className="text-xs text-neutral-400">
                  Order {shortId(item)}
                </p>
              </div>

              {/* Delivery Status */}
              <div className="flex flex-col shrink-0 w-24">
                {item.order?.deliveryStatus === "DELIVERED" ? (
                  <>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {item.order.deliveryStatus}
                    </Badge>
                    <p className="text-xs text-neutral-500 mt-1">
                      on {formatDateMonthAndYear(item.order.updatedAt)}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-neutral-600 text-xs">Delivery Status</p>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {item.order?.deliveryStatus}
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <LeaveReview productId={item.productId!} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default PendingReviewsContainer;
