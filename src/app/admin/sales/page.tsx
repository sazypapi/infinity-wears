import Containers from "../../../../components/global/Containers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SalesPageClient from "../../../../components/sales/SalesPageClient";
import { getAdminAllOrders } from "../../../../utils/actions";
import { clerkClient } from "@clerk/nextjs/server";

async function AdminSales() {
  const orders = await getAdminAllOrders();
  const client = await clerkClient();
  const users = await Promise.all(
    orders.map((order) => client.users.getUser(order.clerkId)),
  );

  const ordersWithUsers = orders.map((order, index) => ({
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
              className="hover:text-black duration-300 transition"
              href="/admin"
            >
              Admin Page
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-black  capitalize">
              Sales
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <SalesPageClient orders={orders} ordersWithUsers={ordersWithUsers} />
    </Containers>
  );
}

export default AdminSales;
