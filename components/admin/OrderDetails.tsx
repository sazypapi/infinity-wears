import { Prisma } from "@/generated/prisma";
import { formatCurrency, formatDateMonthAndYear } from "../../utils/format";
import FormContainer from "../form/FormContainer";
import { adminUpdateOrderAndDeliveryStatus } from "../../utils/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "../form/Buttons";
import OrderDetailsItems from "./OrderDetailsItems";
import { Label } from "@/components/ui/label";

type orderDetails = Prisma.OrderGetPayload<{
  include: {
    orderItems: true;
  };
}>;

function OrderDetails({ order }: { order: orderDetails }) {
  const shortText = (text: string) => text.slice(0, 10).toUpperCase();

  return (
    <div>
      <div>
        <h3 className="text-xs text-black w-fit border-b-2 mb-5 border-black">
          Order Number: {shortText(order.id)}
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
      <div className="border-t-2 border-neutral-200 pt-1 mt-3">
        <h6 className="text-xs text-neutral-600 mb-2">Manage Status</h6>
        <FormContainer action={adminUpdateOrderAndDeliveryStatus}>
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-5 justify-between align-middle items-center sm:items-end">
            <div>
              <Label
                htmlFor="status"
                className="text-xs sm:text-sm mb-1 sm:mb-2 text-neutral-600"
              >
                Order Status
              </Label>
              <Select defaultValue={order.status} name="status">
                <SelectTrigger className="border-2 border-black w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PROCESSED">Processed</SelectItem>
                  <SelectItem value="FINISHED">Finished</SelectItem>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="status"
                className="text-xs sm:text-sm mb-1 sm:mb-2 text-neutral-600"
              >
                Delivery Status
              </Label>

              <Select defaultValue={order.deliveryStatus} name="deliveryStatus">
                <SelectTrigger className="border-2 border-black w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PROCESSING">Processing</SelectItem>
                  <SelectItem value="SHIPPED">Shipped</SelectItem>
                  <SelectItem value="OUT_FOR_DELIVERY">
                    Out for Delivery
                  </SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="RETURNED">Returned</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <SubmitButton text="Update Order" loadingText="Updating..." />
            </div>
          </div>

          <input type="hidden" name="id" value={order.id} />
        </FormContainer>
      </div>
      <div>
        <OrderDetailsItems order={order} />
      </div>
    </div>
  );
}

export default OrderDetails;
