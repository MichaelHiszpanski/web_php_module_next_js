import { NewGroupModel } from "@/src/models/NewGroupModel";
import { useQuery } from "@tanstack/react-query";

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

export const usePostNewGroup = (groupData: NewGroupModel) => {
  return useQuery({
    queryKey: ["groupData", groupData],
    queryFn: () => postNewGroup(groupData),
  });
};
