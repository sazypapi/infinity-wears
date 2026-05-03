import { Badge } from "@/components/ui/badge";
import { Prisma } from "@/generated/prisma";

import Image from "next/image";
import { formatCurrency, formatDateMonthAndYear } from "../../utils/format";
type OrderWithItems = Prisma.OrderGetPayload<{
  include: {
    orderItems: true;
  };
}>;

function OrderDetailsItems({ order }: { order: OrderWithItems }) {
  const fallbackImg =
    "https://files.edgestore.dev/ij70l6t4xyeuequ7/publicFiles/_public/5f763aab-7527-4a54-9b07-c9d1785e1f4a.jpg";
  function truncateText(text: string, maxLength: number = 25): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  }
  return (
    <div className="mt-5">
      <h1 className="text-black text-base mb-5">
        {order.orderItems.length === 1
          ? "The item in this order"
          : "The items in this order"}
      </h1>
      <div className="shadow-xs border-2 border-neutral-100 p-3 rounded-md flex flex-col gap-3">
        {order.orderItems.map((item, index) => {
          return (
            <div
              className={
                index === order.orderItems.length - 1
                  ? "sm:grid sm:grid-cols-4 flex flex-col gap-3 align-middle items-center sm:gap-5"
                  : "sm:grid sm:grid-cols-4 flex flex-col gap-3 align-middle items-center sm:gap-5 border-b-2 border-neutral-200 pb-3"
              }
            >
              <div className="col-span-3  w-full flex flex-col">
                <div className="flex align-middle items-center">
                  {order?.deliveryStatus === "DELIVERED" ? (
                    <>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {order.deliveryStatus}
                      </Badge>
                      <p className="text-xs text-neutral-500 mt-1">
                        on {formatDateMonthAndYear(order.updatedAt)}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-neutral-600 text-xs">
                        Delivery Status
                      </p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {order?.deliveryStatus}
                      </Badge>
                    </>
                  )}
                </div>
                <div className="mt-3 grid  grid-cols-4 justify-between align-middle">
                  <div className="h-16 w-16 sm:h-24 col-span-1 sm:w-24 shrink-0 relative overflow-hidden rounded-lg">
                    <Image
                      src={item.imageUrl || fallbackImg}
                      fill
                      className="object-cover"
                      alt={item.name}
                    />
                  </div>
                  <div className="flex sm:flex-row w-full sm:justify-between flex-col gap-3 sm:gap-0 justify-start col-span-3 align-middle items-start">
                    <h2 className="sm:text-base text-xs text-left truncate">
                      {truncateText(item.name)}
                    </h2>
                    <h4 className="sm:text-sm text-xs text-neutral-600">
                      QTY: {item.quantity}
                    </h4>
                    <h4 className="sm:text-sm text-xs">
                      {formatCurrency(item.price)}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderDetailsItems;
