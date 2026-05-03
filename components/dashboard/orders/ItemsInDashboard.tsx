import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Prisma } from "@/generated/prisma";
import Link from "next/link";
import { formatCurrency, formatDateMonthAndYear } from "../../../utils/format";
import Image from "next/image";
type OrderWithItems = Prisma.OrderGetPayload<{
  include: {
    orderItems: true;
  };
}>;
type productExistenceMap = {
  orderItemId: string;
  exists: boolean;
};
function ItemsInDashboard({
  order,
  productExistenceMap,
}: {
  order: OrderWithItems;
  productExistenceMap?: productExistenceMap[];
}) {
  const slug = (name: string) =>
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  const fallbackImg =
    "https://files.edgestore.dev/ij70l6t4xyeuequ7/publicFiles/_public/5f763aab-7527-4a54-9b07-c9d1785e1f4a.jpg";
  function truncateText(text: string, maxLength: number = 25): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  }
  return (
    <div className="mt-5">
      <h1 className="text-black text-sm mb-5">
        {order.orderItems.length === 1
          ? "The item in your order"
          : "The items in your order"}
      </h1>
      <div className="shadow-xs border-2 border-neutral-100 p-3 rounded-md flex flex-col gap-3">
        {order.orderItems.map((item, index) => {
          const productExists = productExistenceMap?.find(
            (p) => p.orderItemId === item.id,
          )?.exists;

          return (
            <div
              key={item.id}
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
              <div className="col-span-1 flex flex-col align-middle gap-3 items-center justify-center">
                {productExists && (
                  <Link href={`/products/${slug(item.name)}`}>
                    <Button className="bg-white text-black border-2 border-black hover:bg-black hover:text-white transition duration-500">
                      Buy Again
                    </Button>
                  </Link>
                )}

                <Link
                  href={`/contact`}
                  className="bg-white text-black border-none text-xs hover:underline transition duration-500"
                >
                  Have any complaints?
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ItemsInDashboard;
