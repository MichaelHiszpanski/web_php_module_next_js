"use client";

import * as React from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import AnimatedDropdown from "@/src/components/custom-dropdown/CustomDropDown";
import CustomInput from "@/src/components/custom-input/CustomInput";

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("Michael");
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [role, setRole] = React.useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || !role) return;

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
    <div className="flex flex-col  items-center">
      <h1 className="text-3xl md:text-5xl font-orbitron_variable my-10 px-10">
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
        />

        <CustomInput
          label={"Enter password"}
          keyboardType="password"
          value={password}
          onInputChange={(e) => setPassword(e.target.value)}
        />
        <AnimatedDropdown
          label="Select your role"
          options={["Student", "Teacher"]}
          onSelect={(option: any) => setRole(option)}
        />
        <div>
          <button
            className="w-full bg-blue-500 p-2 rounded-lg text-white my-5"
            type="submit"
            disabled={!role}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
