import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Prisma } from "@/generated/prisma";
import Link from "next/link";
import { RxValueNone } from "react-icons/rx";
import { formatCurrency, formatDateMonthAndYear } from "../../utils/format";
type ordersWithUsers = Prisma.OrderGetPayload<{
  include: {
    orderItems: true;
  };
}> & {
  user: {
    firstName: string | null;
    lastName: string | null;
  };
};
function RecentOrders({ orders }: { orders: ordersWithUsers[] }) {
  if (orders.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle className="text-neutral-500 text-sm">
            No Order Found
          </EmptyTitle>
          <EmptyDescription className="text-neutral-600 text-xs">
            No order was found
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }
  const shortText = (text: string) => text.slice(0, 10).toUpperCase();

  return (
    <div className="border-2 border-neutral-100 shadow-xs rounded-sm p-1 mt-5">
      <p className="text-xs text-black text-left">Recent Orders</p>
      <div className="grid sm:grid-cols-6 grid-cols-4 justify-between items-center sm:py-3 p-2 gap-2 sm:px-2 rounded-2xl mb-3">
        <h6 className="text-xs text-neutral-700">Order Id</h6>
        <h6 className="text-xs text-neutral-700">Name</h6>
        <h6 className="text-xs text-neutral-700 hidden sm:inline">Date</h6>
        <h6 className="text-xs text-neutral-700">Price</h6>
        <h6 className="text-xs text-neutral-700 hidden sm:inline">No Items</h6>
        <h6 className="text-xs text-neutral-700">Order Status</h6>
      </div>
      {orders.map((order) => (
        <Link href={`/admin/order-details/${order.id}`} key={order.id}>
          <div className="grid sm:grid-cols-6 grid-cols-4 justify-between items-center bg-neutral-300 sm:py-3 p-2 sm:px-2 rounded-2xl mb-3 gap-2">
            <h6 className="truncate text-black text-xs sm:text-sm">
              {shortText(order.id)}
            </h6>
            <h6 className="text-black text-xs sm:text-sm truncate">
              {order.user?.firstName} {order.user?.lastName}
            </h6>
            <h6 className="hidden sm:inline text-black text-sm">
              {formatDateMonthAndYear(order.createdAt)}
            </h6>
            <h6 className="text-black text-sm truncate">
              {formatCurrency(order.totalAmount)}
            </h6>
            <h6 className="text-black text-sm hidden sm:inline">
              {order.orderItems.length}{" "}
              {order.orderItems.length === 1 ? "item" : "items"}
            </h6>
            <h6 className="text-xs truncate text-black sm:text-sm">
              {order.status}
            </h6>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RecentOrders;
