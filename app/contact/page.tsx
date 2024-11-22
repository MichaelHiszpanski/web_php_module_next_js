import { NextPage } from "next";

import PagesStylesWrapper from "@/src/utils/wrappers/PagesStylesWrapper";

const Contact: NextPage = () => {
  return (
    <PagesStylesWrapper>
      <div className="flex mt-[100px] w-full h-full  items-center justify-center bg-gradient-to-r from-white to-colorTwo"></div>
    </PagesStylesWrapper>
  );
};

export default Contact;
