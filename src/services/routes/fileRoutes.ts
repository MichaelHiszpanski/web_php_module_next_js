import { useQuery } from "@tanstack/react-query";

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

// export const getGroupFilesList = async (groupID: number) => {
//   try {
//     const result = await responseGetGroupFiles(groupID);

//     if (Array.isArray(result)) {
//       return result;
//     } else {
//       return [];
//     }
//   } catch (error) {
//     return [];
//   }
// };
export const getGroupFilesList = (groupID: number) => {
  return useQuery({
    queryKey: ["groupFiles", groupID],
    queryFn: () => responseGetGroupFiles(groupID),
    staleTime: 5 * 60 * 1000,
  });
};
export const responseDownloadFile = async (
  file: { fileid: number; filepath: string },
  onDownloadError: (message: string) => void
) => {
  const response = await fetch(
    `/api/groups/group/files/file?FileID=${file.fileid}`
  );

  if (!response.ok) {
    onDownloadError("Failed to download the file");
  }
  return response;
};
