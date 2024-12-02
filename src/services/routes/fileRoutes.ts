export const responsePostFileToGroup = async (
  GroupID: number,
  UserID: string,
  File: File
) => {
  const formData = new FormData();
  formData.append("GroupID", GroupID.toString());
  formData.append("UserID", UserID);
  formData.append("FileContent", File);

  const response = await fetch("/api/groups/group/files/file", {
    method: "POST",
    body: formData,
  });

  return response.json();
};

export const responseGetGroupFiles = async (groupID: number) => {
  const response = await fetch(`/api/groups/group/files?GroupID=${groupID}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return response.json();
};

export const getFilesListFromGroup = async (
  groupID: number,
  setGroupFiles: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const result = await responseGetGroupFiles(groupID);

    if (Array.isArray(result.messages)) {
      setGroupFiles(result.messages);
    } else {
      setGroupFiles([]);
    }
  } catch (error) {
    setGroupFiles([]);
  }
};