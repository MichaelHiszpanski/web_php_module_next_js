import userStore from "@/src/mobX/user-store/user_store";
import { PersonalDetailModel } from "@/src/models/PersonalDetailsModel";
import { getRoles } from "../routes/userRoutes";

export const addStudnetORTeacher = async (
  formData: PersonalDetailModel,
  setUserData: React.Dispatch<React.SetStateAction<any>>,
  userData: any
) => {
  setUserData({ ...userData, ...formData });
  const setPath =
    formData.userId === "Student" ? "students/student" : "teachers/teacher";
  const studentBody = {
    UserID: userStore.user.userId,
    FirstName: formData.name,
    LastName: formData.lastName,
    City: formData.city,
    Postcode: formData.postcode,
    StreetName: formData.street,
    HouseNumber: formData.houseNumber,
  };
  const teacherBody = {
    UserID: userStore.user.userId,
    FirstName: formData.name,
    LastName: formData.lastName,
    City: formData.city,
    Postcode: formData.postcode,
    StreetName: formData.street,
    HouseNumber: formData.houseNumber,
    Department: "Random",
    Title: formData.type,
  };
  const body = formData.userId === "Student" ? studentBody : teacherBody;
  try {
    const response = await fetch(`/api/${setPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      window.location.reload();
    } else {
      console.log("Something went wrong...!");
    }
  } catch (e) {}
};

export const getRoleNames = async (
  setRoles: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const response = await getRoles();
    if (response.ok) {
      const rolesData = await response.json();

      setRoles(rolesData);
    }
  } catch (error) {}
};
