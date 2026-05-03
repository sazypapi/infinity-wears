import { Prisma } from "@/generated/prisma";
import { formatCurrency, formatDateMonthAndYear } from "../../utils/format";
import EditCustomOrderRequest from "./EditCustomOrderRequest";
import CreateCustomOrder from "./CreateCustomOrderPopover";
import EditCustomOrder from "./EditCustomOrderPopover";
import CustomOrderDetails from "../dashboard/custom-orders/CustomOrderDetails";
export type customOrderWithUsersAndRequest =
  Prisma.CustomPieceRequestGetPayload<{
    include: {
      customOrder: true;
      user: true;
    };
  }>;
function ViewCustomDetailsContainer({
  order,
}: {
  order: customOrderWithUsersAndRequest;
}) {
  return (
    <div className="mt-5">
      {!order.customOrder && (
        <div className="w-full flex justify-end">
          <CreateCustomOrder orderRequest={order} />
        </div>
      )}
      {order.customOrder && (
        <div className="w-full flex justify-end">
          <EditCustomOrder orderRequest={order} />
        </div>
      )}
      <div>
        <h3 className="text-xs text-black w-fit border-b-2 mb-5 border-black">
          Order Number: {order.id.slice(0, 10).toUpperCase()}
        </h3>
        <h4 className="text-xs text-neutral-800">
          Order Status: {order.status}
        </h4>
        <h4 className="text-xs text-neutral-800">
          Placed on {formatDateMonthAndYear(order.createdAt)}
        </h4>
        {order.customOrder?.agreedPrice && (
          <h4 className="text-xs text-neutral-800">
            Agreed Price: {formatCurrency(order.customOrder.agreedPrice)}
          </h4>
        )}
      </div>
      <EditCustomOrderRequest order={order} />
      <CustomOrderDetails customOrder={order} />
    </div>
  );
}

export default ViewCustomDetailsContainer;
