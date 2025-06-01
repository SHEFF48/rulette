import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const H2 = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={cn("title text-[75px] font-bold text-center", className)}>
      {children}
    </h2>
  );
};

export default H2;
