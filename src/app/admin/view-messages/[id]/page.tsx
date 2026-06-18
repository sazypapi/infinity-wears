import React from "react";
import { getSingleMessage } from "../../../../../utils/actions";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RxValueNone } from "react-icons/rx";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Containers from "../../../../../components/global/Containers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ViewSingleMessageContent from "../../../../../components/adminContact/ViewSingleMessageContent";
import TakeAction from "../../../../../components/adminContact/TakeAction";
import EditStatusForm from "../../../../../components/adminContact/EditStatusForm";

async function ViewSingleMessage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const shortText = (text: string) => text.slice(0, 10).toUpperCase();

  const { id } = await params;
  const message = await getSingleMessage(id);
  if (!message) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RxValueNone />
          </EmptyMedia>
          <EmptyTitle>Nothing was found</EmptyTitle>
          <EmptyDescription>
            There is no record of this message
          </EmptyDescription>
          <EmptyContent className="flex-row justify-center gap-2">
            <Link href="/admin/view-messages">
              <Button className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500">
                Back to messages
              </Button>
            </Link>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    );
  }
  return (
    <div className="py-10 px-2 sm:px-0">
      <Containers className="py-5 px-2 border-2 rounded-lg">
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
              <BreadcrumbLink
                className="hover:text-black duration-300 transition"
                href="/admin/view-messages">
                All Messages
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-black capitalize">
                {shortText(message.id).toUpperCase()}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h4 className="text-xs underline text-neutral-600 text-left">
          Message {shortText(message.id)}
        </h4>
        <ViewSingleMessageContent message={message} />
        <TakeAction message={message} />
        <EditStatusForm
          message={message}
          key={message.attendedTo ? "true" : "false"}
        />
      </Containers>
    </div>
  );
}

export default ViewSingleMessage;
