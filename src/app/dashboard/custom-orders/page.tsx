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
import CustomOrdersContainer from "../../../../components/dashboard/custom-orders/CustomOrdersContainer";
import { getUsersCustomOrders } from "../../../../utils/actions";

async function CustomOrderPage() {
  const usersCustomOrders = await getUsersCustomOrders();

  if (usersCustomOrders.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>No Custom Orders Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t made any custom orders yet
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
            <Link href="/create-customorder">Make custom order</Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }
  return (
    <div>
      <CustomOrdersContainer customOrders={usersCustomOrders} />
    </div>
  );
}

export default CustomOrderPage;
