import { Card, CardContent } from "@/components/ui/card";
import { getAdminAllOrders } from "../../utils/actions";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RxValueNone } from "react-icons/rx";
import { clerkClient } from "@clerk/nextjs/server";
import AllOrderClient from "./AllOrderClient";
import Link from "next/link";

async function AllOrders() {
  const allOrders = await getAdminAllOrders();
  const client = await clerkClient();

  if (allOrders.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>Nothing here yet</EmptyTitle>
          <EmptyDescription>No order has been made</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  const users = await Promise.all(
    allOrders.map((order) => client.users.getUser(order.clerkId)),
  );

  const ordersWithUsers = allOrders.map((order, index) => ({
    ...order,
    user: {
      firstName: users[index].firstName,
      lastName: users[index].lastName,
    },
  }));

  return (
    <Card className="bg-gray-200 p-2">
      <CardContent className="flex flex-col w-full p-0">
        <div className="mb-5 flex justify-between align-middle items-center w-full">
          <Link href="/admin/custom-orders">
            <button
              className="whitespace-nowrap text-neutral-600 text-[10px] sm:text-xs hover:bg-neutral-500 hover:text-white border-2 border-neutral-500 transition duration-500 py-1 px-2 rounded-lg"
              type="button"
            >
              View Custom Orders
            </button>
          </Link>
          <Link href="">
            <button
              className="whitespace-nowrap text-neutral-600 text-[10px] sm:text-xs hover:bg-neutral-500 hover:text-white border-2 border-neutral-500 transition duration-500 py-1 px-2 rounded-lg"
              type="button"
            >
              Create Custom Order
            </button>
          </Link>
        </div>
        <AllOrderClient orders={ordersWithUsers} />
      </CardContent>
    </Card>
  );
}

export default AllOrders;
