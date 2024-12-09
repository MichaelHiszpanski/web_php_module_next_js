export const responseMessagesInGropup = async (groupID: number) => {
  const response = await fetch(
    `/api/groups/group/messages?GroupID=${groupID}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.json();
};
export const getMessagesListFromGroup = async (
  groupID: number,
  setMessagesFromGroup: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const result = await responseMessagesInGropup(groupID);

    if (Array.isArray(result.messages)) {
      setMessagesFromGroup(result.messages);
    } else {
      setMessagesFromGroup([]);
    }
  } catch (error) {
    setMessagesFromGroup([]);
  }
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
