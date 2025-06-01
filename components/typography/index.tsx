"use client";
import React, { ReactNode } from "react";
import H1 from "./H1";
import H2 from "./H2";
import H3 from "./H3";
import H4 from "./H4";

const Typography = ({
  level,
  className,
  children,
}: {
  level: number;
  className?: string;
  children: ReactNode;
}) => {
  switch (level) {
    case 1:
      return <H1 className={className}>{children}</H1>;
    case 2:
      return <H2 className={className}>{children}</H2>;
    case 3:
      return <H3 className={className}>{children}</H3>;
    case 4:
      return <H4 className={className}>{children}</H4>;

    default:
      return <></>;
  }
};

export default Typography;
