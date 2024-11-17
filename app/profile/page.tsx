import { NextPage } from "next";
import { useState, useEffect } from "react";
import { SignUp, UserProfile } from "@clerk/nextjs";
import PagesStylesWrapper from "@/src/utils/wrappers/PagesStylesWrapper";

interface Props {
  userExists?: boolean;
}
interface State {}

const Profile: NextPage<Props, State> = ({ userExists }) => {
  return (
    <PagesStylesWrapper>
      <div className="flex mt-[100px] w-full h-full  items-center justify-center bg-gradient-to-r from-white to-colorTwo">
        <UserProfile />
      </div>
    </PagesStylesWrapper>
  );
};

export default Profile;
