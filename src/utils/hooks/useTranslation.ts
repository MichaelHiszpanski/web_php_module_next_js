import { atom, useAtom } from "jotai";
import en from "../../../lang/en.json";
import pl from "../../../lang/pl.json";
export type Languages = "en" | "pl";

export const languageAtom = atom<Languages>("en");

export const useTranslation = () => {
  const [chosenLanguage, setChosenLanguage] = useAtom(languageAtom);
  const dictionary = chosenLanguage === "en" ? en : pl;

  const toggleLanguage = () => {
    chosenLanguage === "en" ? setChosenLanguage("pl") : setChosenLanguage("en");
  };
  return { dictionary, toggleLanguage, chosenLanguage };
};
