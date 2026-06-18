import { Contact } from "@/generated/prisma";
import Link from "next/link";
import React from "react";
import { formatDateMonthAndYear } from "../../utils/format";

function FilteredMessages({ messages }: { messages: Contact[] }) {
  const shortText = (text: string) => text.slice(0, 10).toUpperCase();

  return (
    <>
      <div className="grid md:grid-cols-6 grid-cols-4 justify-between items-center md:py-3 p-2 gap-2 md:px-2 rounded-2xl mb-3">
        <h6 className="text-xs text-neutral-700">Message Id</h6>
        <h6 className="text-xs text-neutral-700">Name</h6>
        <h6 className="text-xs text-neutral-700 hidden md:inline">Date</h6>
        <h6 className="text-xs text-neutral-700">Email</h6>
        <h6 className="text-xs text-neutral-700 hidden md:inline">Phone</h6>
        <h6 className="text-xs text-neutral-700">Message Status</h6>
      </div>
      {messages.map((message) => (
        <Link href={`/admin/view-messages/${message.id}`} key={message.id}>
          <div className="grid md:grid-cols-6 grid-cols-4 justify-between items-center bg-neutral-300 md:py-3 p-2 md:px-2 rounded-2xl mb-3 gap-2">
            <h6 className="truncate text-black text-xs md:text-sm">
              {shortText(message.id)}
            </h6>
            <h6 className="text-black text-xs md:text-sm truncate">
              {message.name}
            </h6>
            <h6 className="hidden md:inline text-black text-sm">
              {formatDateMonthAndYear(message.createdAt)}
            </h6>
            <h6 className="text-black text-xs md:text-sm truncate">
              {message.email}
            </h6>
            <h6 className="text-black text-sm hidden md:inline">
              {message.phoneNumber}
            </h6>
            <h6 className="text-xs truncate text-black md:text-sm">
              {message.attendedTo ? "Attended" : "Pending"}
            </h6>
          </div>
        </Link>
      ))}
    </>
  );
}

export default FilteredMessages;
