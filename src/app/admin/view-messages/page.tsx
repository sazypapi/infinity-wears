import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import Containers from "../../../../components/global/Containers";
import { getAllMessages } from "../../../../utils/actions";
import { RxValueNone } from "react-icons/rx";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AllMessages from "../../../../components/adminContact/AllMessages";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

async function ViewMessages() {
  const allMessages = await getAllMessages();
  if (allMessages.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>Nothing here yet</EmptyTitle>
          <EmptyDescription>No message has been sent</EmptyDescription>
          <EmptyContent className="flex-row justify-center gap-2">
            <Link href="/admin">
              <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
                Back to admin
              </Button>
            </Link>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    );
  }
  return (
    <Containers className="py-10 px-2">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="hover:text-black duration-300 transition"
              href="/admin">
              Admin Page
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="text-black  capitalize">
              All Messages
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-center text-lg sm:text-2xl py-3 font-bold">
        All Messages
      </h1>
      <AllMessages messages={allMessages} />
    </Containers>
  );
}

export default ViewMessages;
