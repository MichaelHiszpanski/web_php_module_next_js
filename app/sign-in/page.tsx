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

const SignIn: NextPage = () => {
  const router = useRouter();

  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState("");
  const { user, isSignedIn } = useUser();
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  // const [emailError, setEmailError] = React.useState<string | null>(null);
  // const [passwordError, setPasswordError] = React.useState<string | null>(null);
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

  const validateInputs = () => {
    let isValid = true;
    const errorsList: any = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      errorsList.email = "Please enter a valid email address.";
      isValid = false;
    } else if (userData.email.trim() === "") {
      errorsList.email = "Email address cannot be empty.";
      isValid = false;
    }

    if (userData.password.trim() === "") {
      errorsList.password = "Password cannot be empty.";
      isValid = false;
    }

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
          userId: "1",
        });
        router.push("/dashboard");
      } else {
        setError("Something went wrong, please try again!");
      }
    } catch (err: any) {
      if (err.errors && err.errors.length > 0) {
        setError(
          err.errors[0].message ||
            "An error occurred, while trying to Login. Please try again."
        );
      } else {
        setError("An unknown error occurred. Please try again!");
      }
    }
  };

  return (
    <div className="flex flex-col  items-center z-50">
      <h1 className="text-3xl md:text-5xl font-orbitron_variable my-10 px-10 z-50">
        Sign-In
      </h1>
      <form
        onSubmit={handleSingIn}
        className="w-full md:w-[620px] border-[0.5px] border-colorOne p-10 rounded-xl my-10"
      >
        <CustomInput
          label={"Enter email address"}
          value={userData.email}
          name="email"
          onInputChange={(e) =>
            setUserData((prev) => ({ ...prev, email: e.target.value }))
          }
          error={errors.email}
        />
        <CustomInput
          label={"Enter password"}
          keyboardType="password"
          name="password"
          value={userData.password}
          onInputChange={(e) =>
            setUserData((prev) => ({ ...prev, password: e.target.value }))
          }
          error={errors.password}
        />
        {error && <div className="text-red-500">{error}</div>}
        <ButtonPrimary title={"Sign-In!"} type="submit" />
      </form>

      <div>
        Don`t dont have an account? Please
        <Link href={"/sign-up"}>
          <span className="text-colorFour ml-2 cursor-pointer">Sign-Up !</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
