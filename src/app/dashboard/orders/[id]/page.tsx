import { getOrder, isProductExists } from "../../../../../utils/actions";
import { Order } from "@/generated/prisma";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RxValueNone } from "react-icons/rx";
import {
  formatCurrency,
  formatDateMonthAndYear,
} from "../../../../../utils/format";
import ItemsInDashboard from "../../../../../components/dashboard/orders/ItemsInDashboard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>Couldn't find order</EmptyTitle>
          <EmptyDescription>This order doesn't exist</EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
            <Link href="/shop">Go to shop</Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }
  const productExistenceMap = await Promise.all(
    order.orderItems.map(async (item) => ({
      orderItemId: item.id,
      exists: item.productId
        ? !!(await isProductExists(item.productId))
        : false,
    })),
  );
  const shortId = (item: Order) => item.id.slice(0, 10).toUpperCase();

  return (
    <div>
      <div>
        <h3 className="text-xs text-black w-fit border-b-2 mb-5 border-black">
          Order Number: {shortId(order)}
        </h3>
        <h4 className="text-xs text-neutral-600">
          {order.orderItems.length === 1
            ? "1 item ordered"
            : `${order.orderItems.length} items ordered`}
        </h4>
        <h4 className="text-xs text-neutral-600">
          Placed on {formatDateMonthAndYear(order.createdAt)}
        </h4>
        <h4 className="text-xs text-neutral-600">
          Total Amount: {formatCurrency(order.totalAmount)}
        </h4>
      </div>
      <div>
        <ItemsInDashboard
          productExistenceMap={productExistenceMap}
          order={order}
        />
      </div>
    </div>
  );
}

export default page;
