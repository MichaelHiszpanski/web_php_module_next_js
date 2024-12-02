"use client";
import Footer from "@/src/components/footer/Footer";
import userStore from "@/src/mobX/user-store/user_store";
import { useUser } from "@clerk/nextjs";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

const Home: NextPage = ({}) => {
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      userStore.clearUser();
    }
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/create-db", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(data.message);
    } else {
      setMessage(data.error || "Something went wrong");
    }
  };

  return (
    <div>
      <div
        className=" w-full h-full flex flex-col items-center"
        style={{
          backgroundImage: `url(/home2.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <h1 className="text-7xl font-mono text-white font-bold mt-20">
          School Manager
        </h1>
        {/* <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write a comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form> */}

        {message && <p>{message}</p>}
      </div>
      <div></div>
      <Footer
        backgroudnColor="bg-colorSix bg-opacity-45"
        fontColor="text-colorOne"
      />
    </div>
  );
};

export default Home;
