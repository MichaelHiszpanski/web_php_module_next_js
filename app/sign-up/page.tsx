"use client";

import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CustomInput from "@/src/components/custom-input/CustomInput";
import ButtonPrimary from "@/src/components/buttons/button-primary/ButtonPrimary";
import { NextPage } from "next";
import { SignUpModel } from "@/src/models/SignUpModel";
import { useTranslation } from "@/src/utils/hooks/useTranslation";

const SignUp: NextPage = () => {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [userData, setUserData] = React.useState<SignUpModel>({
    userName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState<any>({
    userName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = React.useState("");
  const { dictionary } = useTranslation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    if (!validateInputs()) return;

    console.log("Validation passed");
    try {
      await signUp.create({
        emailAddress: userData.email,
        username: userData.userName,
        password: userData.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const validateInputs = () => {
    let isValid = true;
    const errorsList: any = {};

    if (userData.userName.trim() === "") {
      errorsList.userName = dictionary.validations[3].name_empty;
      isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      errorsList.email = dictionary.validations[0].email_valid;
      isValid = false;
    } else if (userData.email.trim() === "") {
      errorsList.email = dictionary.validations[1].email_empty;
      isValid = false;
    }

    if (userData.password.trim() === "") {
      errorsList.password = dictionary.validations[2].password_empty;
      isValid = false;
    }

    if (userData.passwordConfirm.trim() === "") {
      errorsList.passwordConfirm =
        dictionary.validations[4].password_confirmation_empty;
      isValid = false;
    } else if (userData.passwordConfirm !== userData.password) {
      errorsList.passwordConfirm =
        dictionary.validations[5].password_confirmation_check;
      isValid = false;
    }
    setErrors(errorsList);
    return isValid;
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });

        router.push("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  if (verifying) {
    return (
      <div className="w-full h-screen flex flex-col bg-white items-center">
        <h1 className=" text-3xl font-orbitron_variable font-bold text-colorOne mt-[100px] mb-10">
          {dictionary.verify_text}
        </h1>
        <form
          onSubmit={handleVerify}
          className=" border border-colorOne rounded-xl p-5 min-w-[300px]"
        >
          <CustomInput
            label={dictionary.verify_text_label}
            value={code}
            name={"Code"}
            onInputChange={(e) => setCode(e.target.value)}
          />

          <ButtonPrimary title={dictionary.verify_button} type="submit" />
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen  items-center ">
      <h1 className="text-3xl md:text-5xl font-orbitron_variable my-10 px-10 z-50">
        {dictionary.sign_up}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[620px] border-[0.5px] border-colorOne p-10 rounded-xl my-10"
      >
        <CustomInput
          label={dictionary.user_text}
          value={userData.userName}
          name="userName"
          onInputChange={handleInputChange}
          error={errors.userName}
        />
        <CustomInput
          label={dictionary.email_text}
          value={userData.email}
          name="email"
          onInputChange={handleInputChange}
          error={errors.email}
        />

        <CustomInput
          label={dictionary.password_text}
          keyboardType="password"
          name="password"
          value={userData.password}
          onInputChange={handleInputChange}
          error={errors.password}
        />
        <CustomInput
          label={dictionary.password_confirmation_text}
          keyboardType="password"
          name="passwordConfirm"
          value={userData.passwordConfirm}
          onInputChange={handleInputChange}
          error={errors.passwordConfirm}
        />

        <ButtonPrimary title={`${dictionary.sign_up} !`} type="submit" />
      </form>
    </div>
  );
};

export default SignUp;
