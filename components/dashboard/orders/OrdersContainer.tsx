import { Badge } from "@/components/ui/badge";
import { Order, OrderItem } from "@/generated/prisma";
import Image from "next/image";
import Link from "next/link";
import { formatDateMonthAndYear } from "../../../utils/format";

function OrdersContainer({
  orderItems,
  allOrders,
}: {
  orderItems: OrderItem[];
  allOrders: Order[];
}) {
  const shortId = (item: OrderItem) => item.orderId.slice(0, 10).toUpperCase();
  const fallbackImg =
    "https://files.edgestore.dev/ij70l6t4xyeuequ7/publicFiles/_public/5f763aab-7527-4a54-9b07-c9d1785e1f4a.jpg";

  return (
    <div className="flex flex-col w-full">
      {orderItems.map((item, index) => {
        const order = allOrders.find((o) => o.id === item.orderId);
        return (
          <Link
            href={`/dashboard/orders/${item.orderId}`}
            key={item.id}
            className="w-full"
          >
            <div
              className={
                index === orderItems.length - 1
                  ? " items-center w-full p-3 gap-0 sm:gap-3 justify-between grid grid-cols-3"
                  : "items-center w-full p-3 sm:gap-3 gap-0 border-b-2 border-neutral-200 justify-between grid grid-cols-3"
              }
            >
              {/* IMAGE */}
              <div className="h-16 w-16 sm:h-24 sm:w-24 shrink-0 relative overflow-hidden rounded-lg col-span-1">
                <Image
                  src={item.imageUrl || fallbackImg}
                  fill
                  className="object-cover"
                  alt={item.name}
                />
              </div>

              {/* NAME */}
              <div className="flex sm:flex-row justify-between gap-3 col-span-2">
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <h2 className="text-sm truncate">{item.name}</h2>
                  <p className="text-xs text-neutral-400">
                    Order {shortId(item)}
                  </p>
                </div>

                {/* STATUS */}
                <div className="flex flex-col shrink-0 w-24 ">
                  <div className="flex flex-col">
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
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default OrdersContainer;
