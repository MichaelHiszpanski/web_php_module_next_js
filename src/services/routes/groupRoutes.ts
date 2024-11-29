import { NewGroupModel } from "@/src/models/NewGroupModel";
import { useQuery } from "@tanstack/react-query";

export const responseNewGroup = async (groupData: NewGroupModel) => {
  console.log("Posting new group with TeacherID:", groupData.teacherID);
  const response = await fetch("/api/groups/group", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      GroupName: groupData.groupName,
      TeacherID: groupData.teacherID,
      Description: groupData.groupDescription,
    }),
  });
  return response.json();
};

export const responseGetGroups = async (teacherID: number) => {
  const response = await fetch(`/api/groups/group?TeacherID=${teacherID}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const responseUsersFromGroup = async (groupID: number) => {
  const response = await fetch(
    `/api/groups/group/group-users?GroupID=${groupID}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log("STUDENTS RESPONSE ", response);
  return response.json();
};

export const getUsersListsFromGroup = async (
  groupID: number,
  setStudentsFromGroup: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const result = await responseUsersFromGroup(groupID);

    if (Array.isArray(result)) {
      setStudentsFromGroup(result);
    } else {
      setStudentsFromGroup([]);
    }
  } catch (error) {
    setStudentsFromGroup([]);
  }
};

// export const responseGetGroupID = async (groupName: string) => {
//   const response = await fetch(
//     `/api/groups/group/group-id?GroupName=${groupName}`,
//     {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     }
//   );

//   return await response.json();
// };

export const responsePostMemberToGroup = async (
  userID: string,
  groupID: number
) => {
  const response = await fetch("/api/groups/group/group-member", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ UserID: userID, GroupID: groupID }),
  });

  return await response.json();
};
export const responseRemovetMemberToGroup = async (
  userID: string,
  groupID: number
) => {
  const response = await fetch("/api/groups/group/group-member", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ UserID: userID, GroupID: groupID }),
  });

  return await response.json();
};
export const usePostNewGroup = (groupData: NewGroupModel) => {
  return useQuery({
    queryKey: ["groupData", groupData],
    queryFn: () => responseNewGroup(groupData),
    enabled: !!groupData,
  });
};
