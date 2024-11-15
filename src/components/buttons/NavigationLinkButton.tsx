import React, { FC } from "react";
import Link from "next/link";
interface Props {
  name: string;
  hrefLink: string;
  className?: string;
}

const NavigationLinkButton: FC<Props> = ({ name, hrefLink, className }) => {
  return (
    <div
      className={` ${className} rounded-xl font-bold hover:scale-110 select-none font-orbitron_variable text-xl`}
    >
      <Link href={hrefLink}>{name}</Link>
    </div>
  );
};
export default NavigationLinkButton;
