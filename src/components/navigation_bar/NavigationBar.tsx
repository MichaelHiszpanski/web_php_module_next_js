"use client";
import React, { FC, useState, useRef, useEffect } from "react";
import { logoSrc } from "@/src/consts/images";
import Image from "next/image";

import NavigationLinkButton from "../buttons/NavigationLinkButton";
import useOutsideClick from "../../utils/tools/useOutsideClick";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { LanguageSelect } from "../language/LanguageSelect";
import { useTranslation } from "@/src/utils/hooks/useTranslation";
interface NavigationItem {
  hrefLink: string;
  name: string;
}

const NavigationBar: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dictionary } = useTranslation();
  const navRef = useRef<HTMLDivElement>(null);
  const { isSignedIn } = useUser();
  useOutsideClick(navRef, () => setIsModalOpen(false));
  const isMobileSize = useMediaQuery({ maxWidth: 767 });
  const navigationItems: NavigationItem[] = [
    { hrefLink: "/", name: dictionary.navigation[0] },
    { hrefLink: "/dashboard", name: dictionary.navigation[1] },

    { hrefLink: "/contact", name: dictionary.navigation[2] },
  ];
  return (
    <nav
      className="w-full relative h-[100px] flex flex-row justify-evenly items-center 
        bg-gradient-to-r from-colorSrcOne via-colorSrcTwo to-colorSrcThree "
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
            onClick={() => {
              if (isMobileSize) {
                setIsModalOpen(!isModalOpen);
              }
            }}
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
      {isModalOpen && (
        <div className="fixed z-[9999] inset-0 bg-black bg-opacity-50 flex justify-center ">
          <div
            className="bg-gradient-to-r from-colorSix to-colorSeven w-[250px] rounded-full justify-center items-center flex flex-col shadow-sm  h-[250px] mt-[100px] "
            ref={navRef}
          >
            <div className="flex flex-col justify-center items-center text-black ">
              {navigationItems.map((element) => (
                <NavigationLinkButton
                  key={element.name}
                  name={element.name}
                  hrefLink={element.hrefLink}
                />
              ))}

              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <NavigationLinkButton
                  name={dictionary.navigation[3]}
                  hrefLink="/sign-in"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
