import { useQuery } from "@tanstack/react-query";
import { PersonalDetailModel } from "../models/PersonalDetailsModel";
import { UserDetailsModel } from "../models/UserDetailsModel";

export const responseGetUser = async (userId: string) => {
  const response = await fetch(`/api/users/user?UserID=${userId}`, {
    method: "GET",
  });

  const data = await response.json();
  return data;
};
export const useGetUser = (userId: string) => {
  return useQuery({
    queryKey: ["User", userId],
    queryFn: () => responseGetUser(userId),
    enabled: !!userId,
  });
};

export const responsePostUser = async (formData: UserDetailsModel) => {
  const response = await fetch("/api/users/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      UserID: formData.userid,
      UserEmail: formData.useremail,
      UserPassword: formData.userpassword,
      RoleId: formData.roleid,
    }),
  });
  return response;
};

export const responsePostStudentOrTeacher = async (
  formData: PersonalDetailModel,
  rolePath: string
) => {
  const response = await fetch(`/api/${rolePath}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
};
