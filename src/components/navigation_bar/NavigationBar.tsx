"use client";
import React, { FC, useState, useRef, useEffect } from "react";
import {
  logo,
  logo2,
  logoEarth,
  logoEarth2,
  wave_down_three,
  wave_one,
  wave_up_two,
} from "@/src/consts/images";
import Image from "next/image";
import { navigationItems } from "@/src/consts/navigation_list";
import NavigationLinkButton from "../buttons/NavigationLinkButton";
import useOutsideClick from "../../utils/tools/useOutsideClick";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { LanguageSelect } from "../language/LanguageSelect";

const NavigationBar: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const { isSignedIn } = useUser();
  useOutsideClick(navRef, () => setIsModalOpen(false));
  const isMobileSize = useMediaQuery({ maxWidth: 767 });

  return (
    <nav
      className="w-full relative h-[100px] flex flex-row justify-evenly items-center bg-gradient-to-r to-colorFour from-colorEight"
      // style={{
      //   backgroundImage: `url(/sky2.jpg)`,
      //   backgroundSize: "100%",
      //   backgroundPosition: "center",
      //   height: "100px",
      // }}
    >
      {/* <Image
        src={"/nav.png"}
        width={100}
        height={100}
        alt="bg"
        className=" w-full absolute top-0 md:top-[-60px]  select-none overflow-hidden "
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        onDragStart={(e) => e.preventDefault()}
        onClick={(e) => e.preventDefault()}
      /> */}
      <div className="flex flex-row md:justify-evenly justify-between pr-20  items-center w-full h-full z-50">
        <Image
          src={logo2}
          alt="logo"
          className="w-24 h-24 cursor-pointer select-none"
          onClick={() => {
            if (isMobileSize) {
              setIsModalOpen(!isModalOpen);
            }
          }}
        />

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
            name="Sign In"
            hrefLink="/sign-in"
            className="md:flex hidden"
          />
        )}
        <div>
          <LanguageSelect />
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50">
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
                <NavigationLinkButton name="Sign In" hrefLink="/sign-in" />
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
