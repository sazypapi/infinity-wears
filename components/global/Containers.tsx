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
    <div className={cn("mx-auto max-w-6xl xl:max-w-[90%] px-4", className)}>
      {children}
    </div>
  );
}

export default Containers;
