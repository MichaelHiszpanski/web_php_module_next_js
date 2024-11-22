import { PersonalDetailModel } from "../models/PersonalDetailsModel";
import { UserDetailsModel } from "../models/UserDetailsModel";

export const getUser = async (userId: string) => {
  const response = await fetch(`/api/users/user?UserID=${userId}`, {
    method: "GET",
  });

  return response;
};
export const getRoles = async () => {
  const response = await fetch(`/api/roles`, {
    method: "GET",
  });

  return response;
};

export const postUser = async (formData: UserDetailsModel) => {
  const response = await fetch("/api/users/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      UserID: formData.userid,
      UserEmail: formData.userEmail,
      UserPassword: formData.userPassword,
      RoleId: formData.roleId,
    }),
  });
  return response;
};

export const postStudentOrTeacher = async (
  formData: PersonalDetailModel,
  rolePath: string
) => {
  const response = await fetch(`/api/${rolePath}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
};
