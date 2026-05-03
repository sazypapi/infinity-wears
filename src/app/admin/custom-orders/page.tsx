import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Containers from "../../../../components/global/Containers";
import { getAllCustomOrders } from "../../../../utils/actions";
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
import ViewAllCustomOrdersClient from "../../../../components/admin/ViewAllCustomOrdersClient";
import { clerkClient } from "@clerk/nextjs/server";

async function CustomOrders() {
  const allCustomOrders = await getAllCustomOrders();
  if (allCustomOrders.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle className="text-neutral-500">
            No Custom Order Found
          </EmptyTitle>
          <EmptyDescription className="text-neutral-600">
            There are no custom orders
          </EmptyDescription>
          <EmptyContent className="flex-row justify-center gap-2">
            <Link href="/admin">
              <Button className="bg-transparent text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
                Go to admin page
              </Button>
            </Link>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    );
  }
  const client = await clerkClient();

  const users = await Promise.all(
    allCustomOrders.map((order) => client.users.getUser(order.userId)),
  );
  const customOrdersWithUsers = allCustomOrders.map((order, index) => ({
    ...order,
    user: {
      firstName: users[index].firstName,
      lastName: users[index].lastName,
    },
  }));
  return (
    <Containers className="py-5 px-2">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="hover:text-black duration-300 transition text-xs sm:text-sm"
              href="/admin"
            >
              Admin Page
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="text-black  capitalize text-xs sm:text-sm">
              Custom Orders
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-5 w-full border-2 border-neutral-200 rounded-2xl p-2 sm:p-3">
        <ViewAllCustomOrdersClient customOrders={customOrdersWithUsers} />
      </div>
    </Containers>
  );
}

export default CustomOrders;
