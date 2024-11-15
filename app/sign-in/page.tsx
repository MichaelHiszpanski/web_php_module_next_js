"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CustomInput from "@/src/components/custom-input/CustomInput";
import Link from "next/link";
import ButtonPrimary from "@/src/components/buttons/button-primary/ButtonPrimary";

function SignIn() {
  const router = useRouter();

  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const handleSingIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    setError(null);

    try {
      const login = await signIn.create({
        identifier: email,
        password,
      });

      if (login.status === "complete") {
        await setActive({ session: login.createdSessionId });
        router.push("/");
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
          onInputChange={(e) => setEmail(e.target.value)}
        />
        <CustomInput
          label={"Enter password"}
          keyboardType="password"
          value={password}
          onInputChange={(e) => setPassword(e.target.value)}
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
}

export default SignIn;
