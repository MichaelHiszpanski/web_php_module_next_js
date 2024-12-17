"use client";
import Footer from "@/src/components/footer/Footer";
import userStore from "@/src/mobX/user-store/user_store";
import { useUser } from "@clerk/nextjs";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "@/src/utils/hooks/useTranslation";
const Home: NextPage = ({}) => {
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const { dictionary } = useTranslation();
  const { isSignedIn } = useUser();
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
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
          height: "100%",
        }}
      >
        <h1
          className="text-[40px] md:text-[70px] font-bold font-mono bg-gradient-to-r from-colorSrcOne via-colorSrcTwo to-colorSrcThree 
                      bg-clip-text text-transparent  mt-20 mb-5"
        >
          {dictionary.logo}
        </h1>
        <div className="w-full">
          <div className="w-full pl-[15%] justify-start flex flex-row  pr-[15%]">
            <div
              data-aos="fade-right "
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
              className="md:w-[500px] text-black line-clamp-7 bg-white border-2 border-colorSrcOne p-2 rounded-xl  my-5"
            >
              <h2 className="text-2xl text-colorSrcOne font-orbitron_variable font-bold px-2 border-b-[0.5px] pb-2 border-colorSrcOne mb-2">
                {dictionary.home_content[0].postgresSql}
              </h2>
              <p className=" font-mono">
                {
                  dictionary.home_content?.[0]?.postgresSql_description?.[0]
                    ?.description_one
                }
              </p>
              <ul className="list-disc pl-5 marker:bg-colorSrcOne mt-2">
                <li className=" font-orbitron_variable">
                  {
                    dictionary.home_content?.[0]?.postgresSql_description?.[0]
                      ?.line_one
                  }
                </li>
                <li className=" font-orbitron_variable">
                  {
                    dictionary.home_content?.[0]?.postgresSql_description?.[0]
                      ?.line_two
                  }
                </li>
                <li className=" font-orbitron_variable">
                  {
                    dictionary.home_content?.[0]?.postgresSql_description?.[0]
                      ?.line_three
                  }
                </li>
                <li className=" font-orbitron_variable">
                  {
                    dictionary.home_content?.[0]?.postgresSql_description?.[0]
                      ?.line_four
                  }
                </li>
              </ul>
              <p className=" font-mono text-sm mt-2 border-t-[0.5px] px-2 border-colorSrcOne pt-2">
                {
                  dictionary.home_content?.[0]?.postgresSql_description?.[0]
                    ?.line_five
                }
              </p>
            </div>
          </div>
          <div className="w-full justify-end flex flex-row  pr-[15%]">
            <div
              data-aos="fade-left"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
              className="md:w-[500px] text-black line-clamp-7 bg-white border-2 border-colorSrcTwo p-2 rounded-xl  font-mono my-5"
            >
              <h2 className="text-2xl text-colorSrcTwo font-orbitron_variable font-bold px-2 border-b-[0.5px] pb-2 border-colorSrcTwo mb-2">
                {dictionary.home_content[1].clerk}
              </h2>
              <p className=" font-mono">
                {
                  dictionary.home_content?.[1]?.clerk_description?.[0]
                    ?.description_one
                }
              </p>
              <ul className="list-disc pl-5 marker:bg-colorSrcTwo mt-2">
                <li className=" font-orbitron_variable">
                  {
                    dictionary.home_content?.[1]?.clerk_description?.[0]
                      ?.line_one
                  }
                </li>
                <li className=" font-orbitron_variable">
                  {
                    dictionary.home_content?.[1]?.clerk_description?.[0]
                      ?.line_two
                  }
                </li>
                <li className=" font-orbitron_variable">
                  {
                    dictionary.home_content?.[1]?.clerk_description?.[0]
                      ?.line_three
                  }
                </li>
                <li className=" font-orbitron_variable">
                  {
                    dictionary.home_content?.[1]?.clerk_description?.[0]
                      ?.line_four
                  }
                </li>
              </ul>
              <p className=" font-mono text-sm mt-2 border-t-[0.5px] px-2 border-colorSrcTwo pt-2">
                {
                  dictionary.home_content?.[1]?.clerk_description?.[0]
                    ?.line_five
                }
              </p>
            </div>
          </div>
          <div className="w-full justify-center flex flex-row mb-32">
            <div
              data-aos="flip-left"
              data-aos-delay="300"
              data-aos-offset="0"
              data-aos-easing="ease-in-sine"
              className="md:w-[500px] text-black line-clamp-7 bg-white border-2 border-colorSrcThree p-2 rounded-xl  font-mono my-5"
            >
              <h2 className="text-2xl text-colorSrcThree font-orbitron_variable font-bold px-2 border-b-[0.5px] pb-2 border-colorSrcThree mb-2">
                {dictionary.home_content[2].tanstack_query}
              </h2>
              <p className=" font-mono">
                {
                  dictionary.home_content?.[2]?.tanstack_query_description?.[0]
                    ?.description_one
                }
              </p>
              <ul className="list-disc pl-5 marker:bg-colorSrcThree mt-2">
                <li className=" font-orbitron_variable">
                  {
                    dictionary.home_content?.[2]
                      ?.tanstack_query_description?.[0]?.line_one
                  }
                </li>
                <li className=" font-orbitron_variable">
                  {
                    dictionary.home_content?.[2]
                      ?.tanstack_query_description?.[0]?.line_two
                  }
                </li>
                <li className=" font-orbitron_variable">
                  {
                    dictionary.home_content?.[2]
                      ?.tanstack_query_description?.[0]?.line_three
                  }
                </li>
                <li className=" font-orbitron_variable">
                  {
                    dictionary.home_content?.[2]
                      ?.tanstack_query_description?.[0]?.line_four
                  }
                </li>
              </ul>
              <p className=" font-mono text-sm mt-2 border-t-[0.5px] px-2 border-colorSrcThree pt-2">
                {
                  dictionary.home_content?.[2]?.tanstack_query_description?.[0]
                    ?.line_five
                }
              </p>
            </div>
          </div>
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
          backgroudnColor="bg-colorNine bg-opacity-45"
          fontColor="text-colorOne"
        />
      </div>
    </div>
  );
};

export default Home;
