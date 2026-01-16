// import { cn } from "@/lib/utils";
import { cn } from "@/lib/utils";
import React from "react";

function Containers({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-full xl:max-w-[90%] ", className)}>
      {children}
    </div>
  );
}

export default Containers;
