import { getAllOrders } from "../../../../utils/actions";
import OrdersContainer from "../../../../components/dashboard/orders/OrdersContainer";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RxValueNone } from "react-icons/rx";
import Link from "next/link";
async function Orders() {
  const { allOrderedItems, allOrders } = await getAllOrders();
  if (allOrderedItems.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>No Orders Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t made any orders yet
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
            <Link href="/shop">Go to Shop</Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }
  return (
    <div>
      <OrdersContainer orderItems={allOrderedItems} allOrders={allOrders} />
    </div>
  );
}

export default Orders;
