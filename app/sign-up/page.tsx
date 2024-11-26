"use client";

import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import AnimatedDropdown from "@/src/components/custom-dropdown/CustomDropDown";
import CustomInput from "@/src/components/custom-input/CustomInput";
import ButtonPrimary from "@/src/components/buttons/button-primary/ButtonPrimary";
import { NextPage } from "next";
import { SignUpModel } from "@/src/models/SignUpModel";

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

    // if (!isLoaded) return;
    // if (!validateInputs()) return;
    console.log("Submit clicked");
    if (!isLoaded) {
      console.log("Clerk not loaded");
      return;
    }
    if (!validateInputs()) {
      console.log("Validation failed");
      return;
    }

    console.log("Validation passed");
    try {
      await signUp.create({
        emailAddress: userData.email,
        username: userData.userName,
        password: userData.password,
      });

      // await signUp.update({
      //   publicMetadata: { role },
      // });

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
      errorsList.userName = "Name cannot be empty.";
      isValid = false;
    }
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

    if (userData.passwordConfirm.trim() === "") {
      errorsList.confirmPassword = "Confirm password cannot be empty.";
      isValid = false;
    } else if (userData.passwordConfirm !== userData.password) {
      errorsList.passwordConfirm =
        "Yur confirmation password has to match a password";
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
      <>
        <h1>Verify your email</h1>
        <form onSubmit={handleVerify}>
          <label id="code">Enter your verification code</label>
          <input
            value={code}
            id="code"
            name="code"
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="submit">Verify</button>
        </form>
      </>
    );
  }

  return (
    <div className="flex flex-col  items-center ">
      <h1 className="text-3xl md:text-5xl font-orbitron_variable my-10 px-10 z-50">
        Sign up
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[620px] border-[0.5px] border-colorOne p-10 rounded-xl my-10"
      >
        <CustomInput
          label={"User Name"}
          value={userData.userName}
          name="userName"
          onInputChange={handleInputChange}
          error={errors.userName}
        />
        <CustomInput
          label={"Enter email address"}
          value={userData.email}
          name="email"
          onInputChange={handleInputChange}
          error={errors.email}
        />

        <CustomInput
          label={"Enter password"}
          keyboardType="password"
          name="password"
          value={userData.password}
          onInputChange={handleInputChange}
          error={errors.password}
        />
        <CustomInput
          label={"Enter password"}
          keyboardType="password"
          name="passwordConfirm"
          value={userData.passwordConfirm}
          onInputChange={handleInputChange}
          error={errors.passwordConfirm}
        />
        {/* <AnimatedDropdown
          label="Select your role"
          options={["Select your role", "Student", "Teacher"]}
          onSelect={(option: any) => {
            setRole(option);
          }}
          error={roleError}
        /> */}

        <ButtonPrimary title={"Sign-Up!"} type="submit" />
      </form>
    </div>
  );
};

export default SignUp;
