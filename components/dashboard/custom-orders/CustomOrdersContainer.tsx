import { Prisma } from "@/generated/prisma";
import Image from "next/image";
import Link from "next/link";
import { formatDateMonthAndYear } from "../../../utils/format";
import { Badge } from "@/components/ui/badge";

export type customOrderType = Prisma.CustomPieceRequestGetPayload<{
  include: {
    customOrder: true;
  };
}>;
function CustomOrdersContainer({
  customOrders,
}: {
  customOrders: customOrderType[];
}) {
  return (
    <div className="flex flex-col w-full">
      {customOrders.map((item, index) => {
        return (
          <Link
            href={`/dashboard/custom-orders/${item.id}`}
            key={item.id}
            className="w-full"
          >
            <div
              className={
                index === customOrders.length - 1
                  ? " items-start w-full p-3 gap-0 sm:gap-3 justify-between grid grid-cols-3"
                  : "items-start w-full p-3 sm:gap-3 gap-0 border-b-2 border-neutral-200 justify-between grid grid-cols-3"
              }
            >
              {/* IMAGE */}
              <div className="h-16 w-16 sm:h-24 sm:w-24 shrink-0 relative overflow-hidden rounded-lg col-span-1">
                <Image
                  src={item.sampleImages[0]}
                  fill
                  className="object-cover"
                  alt="a sample image"
                />
              </div>

              {/* NAME */}
              <div className="flex sm:flex-row justify-between gap-3 col-span-2">
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <p className="text-xs text-neutral-400 truncate">
                    Garment Type
                  </p>
                  <h2 className="text-sm truncate">{item.garmentType}</h2>
                </div>

                {/* STATUS */}
                <div className="flex flex-col shrink-0 w-24 ">
                  <div className="flex flex-col">
                    {item.status === "ACCEPTED" ? (
                      <>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {item.status}
                        </Badge>
                        <p className="text-xs text-neutral-500 mt-1">
                          on {formatDateMonthAndYear(item.updatedAt)}
                        </p>
                      </>
                    ) : item.status === "DONE" ? (
                      <>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {item.status}
                        </Badge>
                        <p className="text-xs text-neutral-500 mt-1">
                          on {formatDateMonthAndYear(item.updatedAt)}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-neutral-600 text-xs">
                          Request Status
                        </p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {item?.status}
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

export default CustomOrdersContainer;
