import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PagesStylesWrapper: FC<Props> = ({ children }) => {
  return <div className="w-full  flex flex-col">{children}</div>;
};

export default PagesStylesWrapper;
