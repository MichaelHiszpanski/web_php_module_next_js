"use client";

import * as React from "react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CustomInput from "@/src/components/custom-input/CustomInput";
import Link from "next/link";
import ButtonPrimary from "@/src/components/buttons/button-primary/ButtonPrimary";
import userStore from "@/src/mobX/user-store/user_store";
import { NextPage } from "next";

const SignIn: NextPage = () => {
  const router = useRouter();

  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState("");
  const { user, isSignedIn } = useUser();
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [passwordError, setPasswordError] = React.useState<string | null>(null);
  const validateInputs = () => {
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else if (email.trim() === "") {
      setEmailError("Email address cannot be empty.");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (password.trim() === "") {
      setPasswordError("Password cannot be empty.");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  };
  // const fetchUserData = async () => {
  //   if (!user) return;

  //   try {
  //     const response = await fetch(`/api/users/user?UserID=${user.id}`, {
  //       method: "GET",
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       await addUserToDB();
  //       // if (errorData.message === "User not found!") {
  //       //   await addUserToDB();
  //       // }
  //     }

  //     const data = await response.json();
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  const addUserToDB = async () => {
    try {
      const response = await fetch("/api/users/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserID: user!.id,
          UserEmail: email,
          UserPassword: password,
          RoleId: 3,
        }),
      });

      if (!response.ok) {
        throw new Error("Error adding user to Users Table");
      }
    } catch (error) {
      console.error("Error adding user to database:", error);
    }
  };

  const handleSingIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    if (!validateInputs()) return;

    setError(null);

    try {
      const login = await signIn.create({
        identifier: email,
        password,
      });

      if (login.status === "complete") {
        await setActive({ session: login.createdSessionId });

        // if (isSignedIn) {
        //   await addUserToDB();
        //   router.push("/");
        // } else {
        //   await addUserToDB();
        //   setError("2.User is not signed in, please try again.");
        // }
        userStore.setUser({
          email: email,
          password: password,
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
          value={email}
          name="email"
          onInputChange={(e) => setEmail(e.target.value)}
          error={emailError}
        />
        <CustomInput
          label={"Enter password"}
          keyboardType="password"
          name="password"
          value={password}
          onInputChange={(e) => setPassword(e.target.value)}
          error={passwordError}
        />
        {error && <div className="text-red-500">{error}</div>}{" "}
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
