"use client";
import { NextPage } from "next";
import React, { useState } from "react";

const Home: NextPage = ({}) => {
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

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
      <div className="mt-[200px]">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write a comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>

        {message && <p>{message}</p>}
      </div>
      <div>
        <h1>School Manager</h1>
      </div>
    </div>
  );
};

export default Home;
