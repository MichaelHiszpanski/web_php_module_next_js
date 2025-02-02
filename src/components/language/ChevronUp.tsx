import React from "react";
import { IconProps } from "./PlusIcon";

export const ChevronUp = ({ color }: IconProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="chevron-down">
        <path
          id="Icon"
          d="M15 12.5L10 7.5L5 12.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
