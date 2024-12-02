import ButtonPrimary from "@/src/components/buttons/button-primary/ButtonPrimary";
import userStore from "@/src/mobX/user-store/user_store";
import {
  getGroupFilesList,
  responsePostFileToGroup,
} from "@/src/services/routes/fileRoutes";
import React, { useEffect, useState } from "react";
import { FaFileAlt, FaIcons } from "react-icons/fa";
interface Props {
  groupId: number;
}
const FilesContentTab: React.FC<Props> = ({ groupId }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [groupFiles, setGroupFiles] = useState<any[]>([]);
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
    const getGroupFiles = async () => {
      try {
        const response = await getGroupFilesList(groupId);

        if (Array.isArray(response)) {
          setGroupFiles(response);
        } else {
          setGroupFiles([]);
        }
      } catch (error) {
        setGroupFiles([]);
      }
    };

    getGroupFiles();
  }, [groupId]);

  return (
    <div className="w-full flex flex-col min-h-[700px] bg-white items-center">
      <h1 className="text-2xl font-orbitron_variable font-bold">Files</h1>
      <div
        className="w-[90%] h-[600px] rounded-2xl border-2 shadow-xl 
                 border-colorOne bg-colorThree flex flex-col items-start 
                 gap-2 p-4 overflow-y-auto"
        aria-label="Files List"
        style={{ overflowY: "auto" }}
      >
        <div className="grid grid-cols-5 gap-4">
          {groupFiles.length > 0 ? (
            groupFiles.map((file: any, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md border"
              >
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-xl font-bold text-white">
                  <FaFileAlt />
                </div>
                <p className="mt-2 text-sm text-gray-700 text-center">
                  {file.filepath || `File ${index + 1}`}
                </p>
              </div>
            ))
          ) : (
            <p>No files found</p>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-row border border-gray-300 mb-2 items-center">
        <input type="file" onChange={handleFileChange} className="p-2 " />
        <div className="w-full 0">
          <ButtonPrimary
            title={"Uplaod File"}
            onClick={handleFileUpload}
            className="bg-colorFive"
          />
        </div>
      </div>

      {uploadStatus && (
        <p className="mt-2 text-sm text-gray-700">{uploadStatus}</p>
      )}
    </div>
  );
};

export default FilesContentTab;
