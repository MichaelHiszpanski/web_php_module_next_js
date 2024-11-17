"use client";

import * as React from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import AnimatedDropdown from "@/src/components/custom-dropdown/CustomDropDown";
import CustomInput from "@/src/components/custom-input/CustomInput";
import ButtonPrimary from "@/src/components/buttons/button-primary/ButtonPrimary";

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [username, setUsername] = React.useState("Michael");
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [role, setRole] = React.useState<string | null>(null);
  const router = useRouter();
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [passwordError, setPasswordError] = React.useState<string | null>(null);
  const [passwordConfirmError, setPasswordConfirmError] = React.useState<
    string | null
  >(null);
  const [roleError, setRoleError] = React.useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;
    if (!validateInputs()) return;
    try {
      await signUp.create({
        emailAddress,
        username,
        password,
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else if (emailAddress.trim() === "") {
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
    if (passwordConfirm.trim() === "") {
      setPasswordConfirmError("Confirm password cannot be empty.");
      isValid = false;
    } else if (passwordConfirm !== password) {
      setPasswordConfirmError(
        "Yur confirmation password has to match a password"
      );
      isValid = false;
    } else {
      setPasswordConfirmError(null);
    }
    if (!role || role.trim() === "" || role === "Select your role") {
      setRoleError("Please select your role.");
      isValid = false;
    } else {
      setRoleError(null);
    }

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
          label={"Enter email address"}
          value={emailAddress}
          onInputChange={(e) => setEmailAddress(e.target.value)}
          error={emailError}
        />

        <CustomInput
          label={"Enter password"}
          keyboardType="password"
          value={password}
          onInputChange={(e) => setPassword(e.target.value)}
          error={passwordError}
        />
        <CustomInput
          label={"Enter password"}
          keyboardType="password"
          value={passwordConfirm}
          onInputChange={(e) => setPasswordConfirm(e.target.value)}
          error={passwordConfirmError}
        />
        <AnimatedDropdown
          label="Select your role"
          options={["Select your role", "Student", "Teacher"]}
          onSelect={(option: any) => setRole(option)}
          error={roleError}
        />

        <ButtonPrimary title={"Sign-Up!"} type="submit" />
      </form>
    </div>
  );
}
