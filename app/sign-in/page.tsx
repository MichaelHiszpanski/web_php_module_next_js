"use client";

import * as React from "react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CustomInput from "@/src/components/custom-input/CustomInput";
import Link from "next/link";
import ButtonPrimary from "@/src/components/buttons/button-primary/ButtonPrimary";
import userStore from "@/src/mobX/user-store/user_store";
import { NextPage } from "next";
import { useState } from "react";
import { useTranslation } from "@/src/utils/hooks/useTranslation";

const SignIn: NextPage = () => {
  const router = useRouter();
  const { dictionary } = useTranslation();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [error, setError] = React.useState<string | null>(null);
  const [errors, setErrors] = useState<any>({
    email: "",
    password: "",
  });
  const [userData, setUserData] = React.useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
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
  const validateInputs = () => {
    let isValid = true;
    const errorsList: any = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userData.email.trim() === "") {
      errorsList.email = dictionary.validations[1].email_empty;
      isValid = false;
    } else if (!emailRegex.test(userData.email)) {
      errorsList.email = dictionary.validations[0].email_valid;
      isValid = false;
    }

    if (userData.password.trim() === "") {
      errorsList.password = dictionary.validations[2].password_empty;
      isValid = false;
    }
    setErrors(errorsList);
    return isValid;
  };

  const handleSingIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    if (!validateInputs()) return;

    setError(null);

    try {
      const login = await signIn.create({
        identifier: userData.email,
        password: userData.password,
      });

      if (login.status === "complete") {
        await setActive({ session: login.createdSessionId });

        userStore.setUser({
          email: userData.email,
          password: userData.password,
          userId: "3",
        });
        router.push("/dashboard");
      } else {
        setError(dictionary.errors[0].something ?? "");
      }
    } catch (err: any) {
      if (err.errors && err.errors.length > 0) {
        setError(err.errors[0].message || dictionary.errors[0].error_login);
      } else {
        setError(dictionary.errors[0].error_unknown ?? "");
      }
    }
  };

  return (
    <div className="flex flex-col  items-center z-50">
      <h1 className="text-3xl md:text-5xl font-orbitron_variable my-10 px-10 z-50">
        {dictionary.sign_in}
      </h1>
      <form
        onSubmit={handleSingIn}
        className="w-full md:w-[620px] border-[0.5px] border-colorOne p-10 rounded-xl my-10"
      >
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
        {error && <div className="text-red-500">{error}</div>}
        <ButtonPrimary title={dictionary.sign_in} type="submit" />
      </form>

      <div>
        {dictionary["don`t_have_account"]}
        <Link href={"/sign-up"}>
          <span className="text-colorFour ml-2 cursor-pointer">
            {dictionary.sign_up} !
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
