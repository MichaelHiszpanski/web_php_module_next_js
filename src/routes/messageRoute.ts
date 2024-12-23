import { useQuery } from "@tanstack/react-query";

export const responseMessagesInGropup = async (groupID: number) => {
  const response = await fetch(
    `/api/groups/group/messages?GroupID=${groupID}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  const result = await response.json();

  return result.messages || [];
};

export const useGetMessagesListFromGroup = (groupID: number) => {
  return useQuery({
    queryKey: ["groupMessages", groupID],
    queryFn: () => responseMessagesInGropup(groupID),
    staleTime: 5 * 60 * 1000,
  });
};

export const responsePostMessageToGroup = async (
  GroupID: number,
  UserID: string,
  UserName: string,
  MessageContext: string
) => {
  const response = await fetch("/api/groups/group/messages/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ GroupID, UserID, UserName, MessageContext }),
  });

  return response.json();
};
