import { NewGroupModel } from "@/src/models/NewGroupModel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface AddMemberProps {
  userID: string;
  groupID: number;
}
export const responseNewGroup = async (groupData: NewGroupModel) => {
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
export const responseDeleteGroup = async (groupID: number) => {
  const response = await fetch(`/api/groups/group?GroupID=${groupID}`, {
    method: "DELETE",
  });

  return response.json();
};

export const responseGetGroups = async (teacherID: number) => {
  const response = await fetch(`/api/groups/group?TeacherID=${teacherID}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  return result;
};
export const useGetGroups = (teacherID: number) => {
  return useQuery({
    queryKey: ["groupID", teacherID],
    queryFn: () => responseGetGroups(teacherID),
    enabled: !!teacherID,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
export const responseUsersFromGroup = async (groupID: number) => {
  const response = await fetch(
    `/api/groups/group/group-users?GroupID=${groupID}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.json();
};

export const useGetGroupUsers = (groupID: number) => {
  return useQuery({
    queryKey: ["groupUsers", groupID],
    queryFn: () => responseUsersFromGroup(groupID),
    enabled: !!groupID,
  });
};

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

export const useAddMemberToGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userID, groupID }: AddMemberProps) =>
      responsePostMemberToGroup(userID, groupID),
    onSuccess: (_, { groupID }) => {
      queryClient.invalidateQueries({ queryKey: ["groupUsers", groupID] });
    },
  });
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
