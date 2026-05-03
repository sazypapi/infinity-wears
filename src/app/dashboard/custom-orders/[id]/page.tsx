import { getSingleCustomOrder } from "../../../../../utils/actions";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RxValueNone } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  formatCurrency,
  formatDateMonthAndYear,
} from "../../../../../utils/format";
import CustomOrderDetails from "../../../../../components/dashboard/custom-orders/CustomOrderDetails";

async function CustomOrdersSinglePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getSingleCustomOrder(id);
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
            <Link href="/create-customorder">Make custom order</Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }
  const formatCustomRequestStatus = (status: string) => {
    const map: Record<string, string> = {
      PENDING: "Pending",
      SEEN: "Seen",
      ACCEPTED: "Accepted",
      REJECTED: "Rejected",
      DONE: "Done",
    };
    return map[status] ?? status;
  };
  return (
    <div>
      <div>
        <h3 className="text-xs text-black w-fit border-b-2 mb-5 border-black">
          Order Number: {order.id.slice(0, 10).toUpperCase()}
        </h3>

        <h4 className="text-xs text-neutral-600">
          Placed on {formatDateMonthAndYear(order.createdAt)}
        </h4>
        <h4 className="text-xs text-neutral-600">
          Request Status: {formatCustomRequestStatus(order.status)}
        </h4>
        {order.customOrder?.agreedPrice && (
          <h4 className="text-xs text-neutral-600">
            Agreed Price: {formatCurrency(order.customOrder.agreedPrice)}
          </h4>
        )}
      </div>
      <CustomOrderDetails customOrder={order} />
    </div>
  );
}

export default CustomOrdersSinglePage;
