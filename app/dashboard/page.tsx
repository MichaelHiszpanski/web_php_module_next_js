"use client";
import CustomModal from "@/src/components/custom-modal/CustomModal";
import SidePanel from "@/src/components/dashboard/side-panel/SidePanel";
import PersonalDetailsForm from "@/src/components/forms/PersonalDetailsForm";
import userStore from "@/src/mobX/user_store";
import { useUser } from "@clerk/nextjs";
import { NextPage } from "next";
import React, { useState } from "react";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { PersonalDetailModel } from "@/src/models/PersonalDetailsModel";

import {
  UserDetailsModel,
  defaultUserDetails,
} from "@/src/models/UserDetailsModel";
import { responseGetUser, responsePostUser } from "@/src/routes/userRoutes";
import {
  responseAddStudnetORTeacher,
  usePostStudentOrTeacher,
} from "@/src/routes/dashboardRoutes";
import NewGroupForm from "@/src/components/forms/NewGroupForm";
import { NewGroupModel } from "@/src/models/NewGroupModel";
import {
  responseNewGroup,
  useAddMemberToGroup,
  usePostNewGroup,
} from "@/src/routes/groupRoutes";
import { getTeacherID, useGetTeacherId } from "@/src/routes/teacherRoutes";
import TopPanel from "@/src/components/dashboard/top-panel/TopPanel";
import ContentTabs from "@/src/components/dashboard/content-tabs/ContentTabs";
import Footer from "@/src/components/footer/Footer";
import { runInAction } from "mobx";
import LoaderComponent from "@/src/components/loader/Loader";
import CustomErros from "@/src/components/custom-errors/CustomErrors";
import { getStudentID, useGetStudentId } from "@/src/routes/studentRoutes";
const Dashboard: NextPage = () => {
  const router = useRouter();
  const [isBoardOpen, setIsBoardOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isStudent, setIsStudent] = useState<boolean>(true);
  const [isStudentId, setIsStudentId] = useState<number>(3);
  const [userData, setUserData] = useState<any>(defaultUserDetails);

  const { isLoaded, isSignedIn, user } = useUser();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<PersonalDetailModel | null>(null);

  const [groupForm, setGroupForm] = useState<NewGroupModel | null>(null);
  const [groupId, setGroupId] = useState<number>(0);
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState<any>([]);

  const { mutate: addMember } = useAddMemberToGroup();
  const { data: teacherResponse } = useGetTeacherId(userData.userid);
  const { data: studentResponse } = useGetStudentId(userData.userid);
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return <LoaderComponent />;

      try {
        const response = await responseGetUser(user.id);
        userStore.setUser({
          userId: user.id,
          name: user?.username ?? "No Name",
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.message === "User not found!") {
            setIsModal(true);
          }
          return;
        }

        const data = await response.json();

        setUserData({ ...data });

        setIsModal(false);
      } catch (error) {
        setErrors("Error fetching user data:");
      }
    };

    if (isSignedIn) {
      fetchUserData();
    }
  }, [isSignedIn, user]);

  useEffect(() => {
    setIsStudent(false);
    setIsStudent(userData.roleid === 1 ? true : false);
    setIsBoardOpen(true);

    setTimeout(async () => {
      setIsLoading(false);
    }, 1000);
  }, [userData]);

  // useEffect(() => {
  //   setIsStudent(false);
  //   setIsStudent(userData.roleid === 1 ? true : false);
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (userData.roleid === 2) {
        await fetchTeacherID();
      }
      if (userData.roleid == 1) {
        await fetchStudentID();
      }
    };

    fetchData();
  }, [userData.roleid]);

  const fetchTeacherID = async () => {
    try {
      const teacherId = teacherResponse?.TeacherID;

      if (teacherId) {
        setGroupForm((prev: NewGroupModel | null) => ({
          ...prev,
          teacherID: teacherId,
          groupName: prev?.groupName ?? "",
          groupDescription: prev?.groupDescription ?? "",
        }));
        userStore.updateUserDataBaseID(teacherId);
        userStore.updateUserIsStudent(false);
      } else {
        setErrors("No Teacher ID found in response!");
      }
    } catch (error) {
      setErrors("Error fetching Teacher ID:");
    }
  };

  const fetchStudentID = async () => {
    try {
      // const studentResponse = await getStudentID(userData.userid);
      const studentId = studentResponse?.StudentID;

      if (studentId) {
        setIsStudentId(studentId);
        userStore.updateUserDataBaseID(studentId);
        userStore.updateUserIsStudent(true);
      } else {
        setErrors("No Studnet ID found in response!");
      }
    } catch (error) {
      setErrors("Error fetching Studnet ID:");
    }
  };

  const addUserToDB = async (formData: PersonalDetailModel) => {
    try {
      const role =
        formData.role == "Student" ? 1 : formData.role === "Teacher" ? 2 : 3;

      const data: UserDetailsModel = {
        userid: userStore.user.userId,
        userEmail: userStore.user.email,
        userPassword: userStore.user.password,
        roleId: role,
      };
      const response = await responsePostUser(data);

      if (response.ok) {
        setTimeout(async () => {
          await responseAddStudnetORTeacher(formData);
        }, 2000);
      }
    } catch (error) {
      setErrors("Error adding user to database:");
    }
  };

  const openSecondModal = async () => {
    setIsSecondModalOpen(true);
  };

  const handleFormSubmit = async (formData: PersonalDetailModel) => {
    setFormData(formData);
    setUserData({ ...userData, ...formData });
    await addUserToDB(formData);
  };

  const handleSubmit = async (groupForm: NewGroupModel) => {
    if (!groupForm?.teacherID) {
      return;
    }

    const response = await responseNewGroup(groupForm);

    if (response.message === "success") {
      const groupID = response.groupid;
      const userID = userStore.user.userId;
      addMember({ userID, groupID });
      setIsSecondModalOpen(false);
    }
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  if (isLoading) return <LoaderComponent />;

  if (!isLoaded) return <LoaderComponent />;

  if (!isSignedIn) {
    if (typeof window !== "undefined") {
      window.location.href = "/sign-in";
    }
    return null;
  }

  return (
    <div
      className={`flex h-screen flex-row  bg-gradient-to-r from-colorSrcOne via-colorSrcTwo to-colorSrcThree
       `}
    >
      <SidePanel
        isBoardOpen={isBoardOpen}
        setIsBoardOpen={setIsBoardOpen}
        openSecondModal={openSecondModal}
        isStudent={isStudent}
        teacherID={groupForm?.teacherID}
        setGroupId={setGroupId}
      />

      <div className="flex flex-col w-full items-center ">
        <TopPanel
          isBoardOpen={isBoardOpen}
          isStudent={isStudent}
          onChnageTab={handleTabChange}
        />

        <ContentTabs
          isBoardOpen={isBoardOpen}
          isStudent={isStudent}
          currentActiveTab={activeTab}
          groupId={groupId}
        />
      </div>
      <CustomModal
        isModalOpen={isModal}
        onCloseModal={() => setIsModal(false)}
        isCloseButtonavaiable={false}
      >
        <div className="md:w-[600px]">
          <h2 className="text-xl font-bold">Register new User</h2>
          <p className="mt-2">
            Please fill all the informations and select your Role.
          </p>
          <PersonalDetailsForm
            onSubmit={(formData) => {
              handleFormSubmit(formData);
            }}
          />
        </div>
      </CustomModal>
      <CustomModal
        isModalOpen={isSecondModalOpen}
        onCloseModal={() => setIsSecondModalOpen(false)}
        isCloseButtonavaiable={true}
      >
        <div className="md:w-[600px]">
          <h2 className="text-xl font-bold">Create new group</h2>
          <p className="mt-2">
            This is the second modal attached to the Dashboard component.
          </p>
          <NewGroupForm
            onSubmit={(groupForm) => handleSubmit(groupForm)}
            groupForm={groupForm}
          />
        </div>
      </CustomModal>
    </div>
  );
};

export default observer(Dashboard);
