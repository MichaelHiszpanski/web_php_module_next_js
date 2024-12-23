"use client";
import React, { FC } from "react";
import { logoSrc } from "@/src/consts/images";
import Image from "next/image";
import NavigationLinkButton from "../buttons/NavigationLinkButton";
import { UserButton, useUser } from "@clerk/nextjs";
import { LanguageSelect } from "../language/LanguageSelect";
import { useTranslation } from "@/src/utils/hooks/useTranslation";

interface NavigationItem {
  hrefLink: string;
  name: string;
}

const NavigationBar: FC = () => {
  const { dictionary } = useTranslation();
  const { isSignedIn } = useUser();

  const navigationItems: NavigationItem[] = [
    { hrefLink: "/", name: dictionary.navigation[0] },
    { hrefLink: "/dashboard", name: dictionary.navigation[1] },

    { hrefLink: "/profile", name: dictionary.navigation[2] },
  ];

  return (
    <nav
      className="w-full fixed top-0 h-[100px] flex flex-row justify-evenly items-center 
        bg-gradient-to-r from-colorSrcOne via-colorSrcTwo to-colorSrcThree z-50"
    >
      <div
        className="flex flex-row md:justify-evenly ml-5 md:ml-0 justify-between pr-20 
         items-center w-full h-full  "
      >
        <div className=" rounded-3xl bg-white  md:px-5 px-2  shadow-xl">
          <Image
            src={logoSrc}
            alt="logo"
            className=" w-32 h-20 cursor-pointer select-none"
            onClick={() => window.open("https://www.src.ac.uk/", "_blank")}
          />
        </div>

        {navigationItems.map((element) => (
          <NavigationLinkButton
            key={element.name}
            name={element.name}
            hrefLink={element.hrefLink}
            className=" hidden md:flex"
          />
        ))}
        {isSignedIn && <UserButton afterSignOutUrl="/" />}
        {isSignedIn ? (
          <></>
        ) : (
          <NavigationLinkButton
            name={dictionary.navigation[3]}
            hrefLink="/sign-in"
            className="md:flex hidden"
          />
        )}
        <div className="w-[120px] h-full flex items-center">
          <LanguageSelect />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
