import { Button } from "@/components/ui/button";
import { getAdminSingleOrder } from "../../../../../utils/actions";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { RxValueNone } from "react-icons/rx";
import Link from "next/link";
import Containers from "../../../../../components/global/Containers";
import OrderDetails from "../../../../../components/admin/OrderDetails";
async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getAdminSingleOrder(id);
  if (!order) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>Couldn't find order</EmptyTitle>
          <EmptyDescription>This order doesn't exist</EmptyDescription>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
              <Link href="/admin">Go to admin page</Link>
            </Button>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    );
  }
  const shortText = (text: string) => text.slice(0, 10).toUpperCase();
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
              Order {shortText(order.id)}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-5">
        <OrderDetails order={order} />
      </div>
    </Containers>
  );
}

export default OrderDetailsPage;
