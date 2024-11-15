import React, { FC, ReactNode } from "react";

interface Props {
  rowGap?: string;
  columnGap?: string;
  children: ReactNode;
}

const GridWrapper: FC<Props> = ({
  columnGap = "4",
  children,
  rowGap = "4",
}) => {
  return (
    <div
      className={`grid gap-y-${rowGap} gap-x-${columnGap} 
          grid-cols-1 
          lg:grid-cols-2 
          xl:grid-cols-3   place-items-center`}
    >
      {children}
    </div>
  );
};

export default GridWrapper;
