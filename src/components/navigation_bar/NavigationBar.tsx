"use client";
import React, { FC, useState, useRef, useEffect } from "react";
import {
  logo,
  wave_down_three,
  wave_one,
  wave_up_two,
} from "@/src/consts/images";
import Image from "next/image";
import { navigationItems } from "@/src/consts/navigation_list";
import NavigationLinkButton from "../buttons/NavigationLinkButton";
import useOutsideClick from "../../utils/tools/useOutsideClick";

import { useRouter } from "next/navigation";

const NavigationBar: FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  useOutsideClick(navRef, () => setIsModalOpen(false));

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <nav className="w-full relative h-[100px] flex flex-row justify-evenly items-center">
      <Image
        src={wave_down_three}
        alt="bg"
        className=" w-full absolute top-0 md:top-[-60px]  select-none overflow-hidden "
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        onDragStart={(e) => e.preventDefault()}
        onClick={(e) => e.preventDefault()}
      />
      <div className="flex flex-row md:justify-evenly items-center w-full h-full z-50">
        <Image
          src={logo}
          alt="logo"
          className="w-24 h-24 cursor-pointer select-none"
          onClick={() => {}}
        />

        {navigationItems.map((element) => (
          <NavigationLinkButton
            key={element.name}
            name={element.name}
            hrefLink={element.hrefLink}
            className=" hidden md:flex"
          />
        ))}
        {isAuthenticated ? (
          <button
            onClick={() => {}}
            className="md:flex hidden  rounded-xl font-bold hover:scale-110 select-none font-orbitron_variable text-xl"
          >
            Log Out
          </button>
        ) : (
          <NavigationLinkButton
            name="Sign In"
            hrefLink="/sign-in"
            className="md:flex hidden"
          />
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50">
          <div
            className="bg-gradient-to-r from-colorSix to-colorSeven w-[250px] rounded-full justify-center items-center flex flex-col shadow-sm  h-[250px] mt-[100px] "
            ref={navRef}
          >
            <div className="flex flex-col justify-center items-center text-black ">
              {/* <h2 className="text-lg font-bold mb-2 text-black">Navigation</h2> */}
              {navigationItems.map((element) => (
                <NavigationLinkButton
                  key={element.name}
                  name={element.name}
                  hrefLink={element.hrefLink}
                />
              ))}

              {isAuthenticated ? (
                <button
                  onClick={() => {}}
                  className="flex md:hidden  rounded-xl font-bold hover:scale-110 select-none font-orbitron_variable text-xl"
                >
                  Log Out
                </button>
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
