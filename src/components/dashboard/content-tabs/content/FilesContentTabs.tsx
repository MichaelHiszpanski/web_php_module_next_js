import userStore from "@/src/mobX/user-store/user_store";
import {
  getFilesListFromGroup,
  responsePostFileToGroup,
} from "@/src/services/routes/fileRoutes";
import React, { useEffect, useState } from "react";
interface Props {
  groupId: number;
}
const FilesContentTab: React.FC<Props> = ({ groupId }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [groupFiles, setGroupFiles] = useState<any>([]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("No file selected");
      return;
    }

    try {
      const response = await responsePostFileToGroup(
        groupId,
        userStore.user.userId,
        selectedFile
      );

      if (response.success) {
        setUploadStatus("File uploaded successfully");
      } else {
        setUploadStatus(`Error: ${response.error}`);
      }
    } catch (e) {}
  };

  useEffect(() => {
    getFilesListFromGroup(groupId, setGroupFiles);
  }, [groupId]);
  return (
    <div className="w-full flex flex-col min-h-[700px] bg-white items-center">
      <h1>Files</h1>
      <div
        className="w-[90%] h-[600px] rounded-2xl border-2 shadow-xl 
                 border-colorOne bg-gray-400 flex flex-col-reverse items-start 
                 gap-2 p-4 overflow-y-auto"
        aria-label="Files List"
        style={{ overflowY: "auto" }}
      >
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ].map((item) => (
          <div
            key={item}
            className="w-full bg-white p-2 rounded-md shadow-sm border border-gray-200"
          >
            File {item}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-2 border border-gray-300 p-2"
        />
        <button
          onClick={handleFileUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload File
        </button>
      </div>
      {uploadStatus && (
        <p className="mt-2 text-sm text-gray-700">{uploadStatus}</p>
      )}
    </div>
  );
};

export default FilesContentTab;
