"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
interface Props {
  isVisible?: boolean;
  backgroudnColor?: string;
  fontColor?: string;
}
const Footer: FC<Props> = ({
  isVisible = true,
  backgroudnColor = "bg-colorSix",
  fontColor = "text-colorTwo",
}) => {
  const router = useRouter();

  return (
    <footer
      className={`flex w-full h-[85px] flex-col md:flex-row 
                items-center bg-gradient-to-r  ${backgroudnColor} justify-center md:justify-between 
                 text-[#808A9D] dark:text-darkSecondary z-40 transition-opacity duration-300 ${
                   isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                 }`}
    >
      <Link
        className={`${fontColor} text-right  ml-10 select-none hover:scale-125 transition  font-orbitron_variable`}
        href={
          "https://www.open.ac.uk/courses/choose/the-open-university?ps_kw=open%20university%20uk&cid=sem-9237400975&gad_source=1&gclid=Cj0KCQiAvbm7BhC5ARIsAFjwNHsEZWzvpjqXp8S3bhEgy4ZaUCL-8pvODhIA8SKgBXd2GQ7dytd0byEaAv2NEALw_wcB&gclsrc=aw.ds"
        }
        target="_blank"
      >
        The Open Univeristy
      </Link>

      <Link
        className={`${fontColor} select-none font-jost_variable"`}
        href={"https://dungeon-studio.vercel.app/"}
        target="_blank"
      >
        © 2024 Dungeon Studio. All rights reserved.
      </Link>
      <div className=" flex justify-center md:mr-16">
        <a
          href="https://nextjs.org/"
          className={`${fontColor} text-right  lg:text-left select-none hover:scale-125 transition  font-orbitron_variable`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Next JS
        </a>
      </div>
    </footer>
  );
};
export default Footer;
