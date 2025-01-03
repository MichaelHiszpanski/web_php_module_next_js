import React from "react"

export interface IconProps {
  color: string
}

export const PlusIcon = ({ color }: IconProps) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="plus">
        <path
          id="Icon"
          d="M10.0001 4.16666V15.8333M4.16675 9.99999H15.8334"
          stroke={color}
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  )
}
