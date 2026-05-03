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
import { getAdminSingleCustomOrder } from "../../../../../utils/actions";
import Link from "next/link";
import Containers from "../../../../../components/global/Containers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ViewCustomDetailsContainer from "../../../../../components/admin/ViewCustomDetailsContainer";
async function ViewSingleCustomOrder({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getAdminSingleCustomOrder(id);
  if (!order) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle className="text-neutral-500">
            Custom Order not Found
          </EmptyTitle>
          <EmptyDescription className="text-neutral-600">
            This custom order doesn't exist
          </EmptyDescription>
          <EmptyContent className="flex-row justify-center gap-2">
            <Link href="/admin/custom-orders">
              <Button className="bg-transparent text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
                Go to custom orders
              </Button>
            </Link>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    );
  }
  return (
    <Containers className="py-5 px-2">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="hover:text-black duration-300 transition sm:text-sm text-xs"
              href="/admin"
            >
              Admin Page
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              className="hover:text-black duration-300 transition sm:text-sm text-xs"
              href="/admin/custom-orders"
            >
              Custom Orders
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-black  capitalize sm:text-sm text-xs">
              Order {order.id.slice(0, 10).toUpperCase()}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ViewCustomDetailsContainer order={order} />
    </Containers>
  );
}

export default ViewSingleCustomOrder;
