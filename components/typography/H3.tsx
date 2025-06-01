import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const H3 = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h3 className={cn("title text-[35px] font-bold leading-none", className)}>
      {children}
    </h3>
  );
};

export default H3;
