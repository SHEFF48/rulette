import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const H4 = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h4 className={cn("title text-[25px] font-bold leading-none", className)}>
      {children}
    </h4>
  );
};

export default H4;
