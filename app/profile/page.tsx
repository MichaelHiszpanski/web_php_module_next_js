"use client";
import { NextPage } from "next";
import { useCallback, useEffect, useReducer, useState } from "react";
import { UserDetailsModel } from "@/src/models/UserDetailsModel";
import { useTranslation } from "@/src/utils/hooks/useTranslation";
import userStore from "@/src/mobX/user_store";
import { responseGetUser } from "@/src/routes/userRoutes";
import { useUser } from "@clerk/nextjs";
import { getStudentID } from "@/src/routes/studentRoutes";
import { getTeacherID } from "@/src/routes/teacherRoutes";
import {
  useGetStudentData,
  useGetTeacherData,
} from "@/src/routes/profileDataRoutes";
import ProfileDisplay from "@/src/components/dashboard/components/ProfileDisplay";
import LoaderComponent from "@/src/components/loader/Loader";

const Contact: NextPage = () => {
  const [formData, setFormData] = useState<any>(null);
  const { dictionary } = useTranslation();
  const defaultUserDetails: UserDetailsModel = {
    userid: "",
    useremail: "",
    userpassword: "",
    roleid: 0,
    datecreated: new Date("2024-11-21T16:30:41.392Z"),
  };
  const [userData, setUserData] = useState<any>(defaultUserDetails);

  const { isLoaded, isSignedIn, user } = useUser();
  const [errors, setErrors] = useState<any>([]);
  const [teacherID, setTeacherID] = useState<number | null>(null);
  const [studentID, setStudentID] = useState<number | null>(null);
  const { data: teacherProfile, isLoading: teacherLoading } = useGetTeacherData(
    teacherID ?? 0
  );

  const { data: studentProfile, isLoading: studentLoading } = useGetStudentData(
    studentID ?? 0
  );
  useEffect(() => {
    console.log("Stage 1");
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const data = await responseGetUser(user.id);

        userStore.setUser({
          userId: user.id,
          name: user?.username ?? "No Name",
        });
        if (!data.userid) {
          window.location.href = "/dashbaord";
          return;
        }

        setUserData({ ...data });
      } catch (error) {
        setErrors("Error fetching user data.");
      }
    };

    if (isSignedIn) {
      console.log("Stage 2");
      fetchUserData();
    }
  }, [isSignedIn, user]);
  const fetchTeacherID = useCallback(async () => {
    try {
      const teacherId = await getTeacherID(userData.userid);
      if (teacherId) {
        console.log("Stage 3", teacherId.TeacherID);
        userStore.updateUserDataBaseID(teacherId.TeacherID);
        setTeacherID(teacherId.TeacherID);
      } else {
        setErrors("No Teacher ID found in response!");
      }
    } catch (error) {
      setErrors("Error fetching Teacher ID:");
    }
  }, [userData.userid]);

  const fetchStudentID = useCallback(async () => {
    try {
      const response = await getStudentID(userData.userid);
      if (response.StudentID) {
        userStore.setUser({ dataBaseID: response.StudentID });
        setStudentID(response.StudentID);
        console.log("Stage 4", studentID);
      } else {
        setErrors("No Student ID found in DataBase.");
      }
    } catch (error) {
      setErrors("Error fetching Student ID.");
    }
  }, [userData.userid]);

  useEffect(() => {
    console.log("Stage 5");
    const fetchData = async () => {
      if (userData.roleid === 2) {
        await fetchTeacherID();
      }
      if (userData.roleid == 1) {
        await fetchStudentID();
      }
    };

    fetchData();
  }, [userData.roleid, fetchTeacherID, fetchStudentID]);

  useEffect(() => {
    console.log("Stage 6");
    if (teacherProfile && userData.roleid === 2) {
      setFormData(teacherProfile);
    }
  }, [teacherProfile, userData.roleid]);

  useEffect(() => {
    console.log("Stage 7", studentLoading);
    console.log("Stage 7", studentProfile);
    if (studentProfile && userData.roleid === 1) {
      setFormData(studentProfile);
    }
  }, [studentProfile, userData.roleid]);

  if (
    !isLoaded ||
    (userData.roleid === 2 && teacherLoading) ||
    (userData.roleid === 1 && studentLoading)
  ) {
    return <LoaderComponent />;
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-red-200  items-center pt-10 bg-gradient-to-r from-colorSeven via-colorTwo to-colorNine">
      <h1
        className="text-[40px] md:text-[70px] font-bold font-orbitron_variable bg-gradient-to-r from-colorSrcThree via-colorSrcTwo to-colorSrcOne 
                      bg-clip-text text-transparent  mt-5 mb-10 select-none"
      >
        {dictionary.navigation[2]}
      </h1>
      <div className="w-[650px] ">
        {!formData || formData.length === 0 ? (
          <LoaderComponent />
        ) : (
          formData.map((user: any, index: number) => (
            <ProfileDisplay
              user={user}
              key={index}
              isStudent={userData.roleid === 1}
            />
          ))
        )}
      </div>
      <div className="h-[120px]" />
    </div>
  );
};

export default Contact;
