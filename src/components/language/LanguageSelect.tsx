import { languageAtom, useTranslation } from "../../utils/hooks/useTranslation";
import { useAtom } from "jotai";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChrevronDown } from "./ChrevronDown";
import { ChevronUp } from "./ChevronUp";

export const LanguageSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { chosenLanguage } = useTranslation();
  const [, setChosenLanguage] = useAtom(languageAtom);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={selectRef}>
      <button
        className="flex items-center gap-2 select-none"
        onClick={toggleSelect}
      >
        {chosenLanguage === "en" ? (
          <>
            <Image
              src={"/flags/gb.svg"}
              alt="Great Britain flag"
              width={24}
              height={24}
            />
            <p className="hidden font-semibold text-[#222531] dark:text-darkPrimary lg:block">
              ENG
            </p>
          </>
        ) : (
          <>
            <Image
              src={"/flags/pl.svg"}
              alt="Poland flag"
              width={24}
              height={24}
            />
            <p className="hidden font-semibold text-[#222531] dark:text-darkPrimary lg:block">
              PL
            </p>
          </>
        )}
        {!isOpen ? (
          <>
            <div className="dark:hidden">
              <ChrevronDown color={"#222531"} />
            </div>
            <div className="hidden dark:block">
              <ChrevronDown color={"white"} />
            </div>
          </>
        ) : (
          <>
            <div className="dark:hidden">
              <ChevronUp color={"#222531"} />
            </div>
            <div className="hidden dark:block">
              <ChevronUp color={"white"} />
            </div>
          </>
        )}
      </button>
      {isOpen && (
        <div
          className="absolute right-0 z-50 mt-2 w-40 origin-top-right cursor-pointer rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 transition ease-in-out focus:outline-none dark:bg-darkBg"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="flex flex-col gap-1">
            <div
              className="flex items-center gap-2 p-2"
              onClick={() => {
                setChosenLanguage("en");
                setIsOpen(false);
              }}
            >
              <Image
                src={"/flags/gb.svg"}
                alt="Great Britain flag"
                width={24}
                height={24}
              />
              <p>English</p>
            </div>
            <div
              className="items-cener flex gap-2 p-2"
              onClick={() => {
                setChosenLanguage("pl");
                setIsOpen(false);
              }}
            >
              {" "}
              <Image
                src={"/flags/pl.svg"}
                alt="Poland flag"
                width={24}
                height={24}
              />
              <p>Polski</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
