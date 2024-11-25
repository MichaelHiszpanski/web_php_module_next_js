import { NewGroupModel } from "@/src/models/NewGroupModel";

export const postNewGroup = async (groupData: NewGroupModel) => {
  const response = await fetch("/api/groups/group", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      GroupName: groupData.groupName,
      TeacherID: groupData.teacherID,
      Description: groupData.groupDescription,
    }),
  });
  return response;
};
