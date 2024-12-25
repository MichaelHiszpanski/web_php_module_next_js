"use client";
import { NextPage } from "next";

import PersonalDetailsForm from "@/src/components/forms/PersonalDetailsForm";
import { PersonalDetailModel } from "@/src/models/PersonalDetailsModel";
import { useState } from "react";
import { UserDetailsModel } from "@/src/models/UserDetailsModel";
import { useTranslation } from "@/src/utils/hooks/useTranslation";

const Contact: NextPage = () => {
  const [formData, setFormData] = useState<PersonalDetailModel | null>(null);
  const { dictionary } = useTranslation();
  const defaultUserDetails: UserDetailsModel = {
    userid: "",
    useremail: "",
    userpassword: "",
    roleid: 0,
    datecreated: new Date("2024-11-21T16:30:41.392Z"),
  };
  const [userData, setUserData] = useState<any>(defaultUserDetails);
  const handleFormSubmit = async (formData: PersonalDetailModel) => {
    setFormData(formData);
    setUserData({ ...userData, ...formData });
  };
  return (
    <div className="w-full min-h-screen flex flex-col bg-red-200  items-center justify-center bg-gradient-to-r from-colorSeven via-colorTwo to-colorNine">
      <h1
        className="text-[40px] md:text-[70px] font-bold font-mono bg-gradient-to-r from-colorSrcThree via-colorSrcTwo to-colorSrcOne 
                      bg-clip-text text-transparent  mt-5 mb-5 select-none"
      >
        {dictionary.navigation[2]}
      </h1>
      <div className=" w-[650px] bg-white p-2 rounded-xl ">
        <PersonalDetailsForm onSubmit={handleFormSubmit} />
      </div>
      <div className="h-[120px]" />
    </div>
  );
};

export default Contact;
