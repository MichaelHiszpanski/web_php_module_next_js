"use client";
import { NextPage } from "next";

import PersonalDetailsForm from "@/src/components/forms/PersonalDetailsForm";
import { PersonalDetailModel } from "@/src/models/PersonalDetailsModel";
import { useState } from "react";
import { UserDetailsModel } from "@/src/models/UserDetailsModel";
import Footer from "@/src/components/footer/Footer";
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
    <div className="w-full min-h-screen flex flex-col bg-red-200  items-center justify-center bg-gradient-to-r from-colorTwo via-colorSrcThree to-colorTwo">
      <h1
        className="text-[40px] md:text-[70px] font-bold font-mono bg-gradient-to-r from-colorSrcOne via-colorSrcTwo to-colorSrcThree 
                      bg-clip-text text-transparent  mt-20 mb-5 select-none"
      >
        {dictionary.logo}
      </h1>
      <div className=" w-[650px] bg-white p-2 rounded-xl "></div>
      <div className="h-[120px]" />
    </div>
  );
};

export default Contact;
