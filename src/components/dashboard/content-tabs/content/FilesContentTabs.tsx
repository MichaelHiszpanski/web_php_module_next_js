import ButtonPrimary from "@/src/components/buttons/button-primary/ButtonPrimary";
import userStore from "@/src/mobX/user_store";
import {
  responsePostFileToGroup,
  useGetGroupFilesList,
} from "@/src/services/routes/fileRoutes";
import React, { useState } from "react";
import FileDisplay from "../../components/FileDisplay";
import CustomErros from "@/src/components/custom-errors/CustomErrors";
import { useQueryClient } from "@tanstack/react-query";
interface Props {
  groupId: number;
}
const FilesContentTab: React.FC<Props> = ({ groupId }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [errors, setErrors] = useState<any>([]);
  const queryClient = useQueryClient();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const {
    data: groupFiles = [],
    isLoading,
    isError,
  } = useGetGroupFilesList(groupId);

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
        queryClient.invalidateQueries({ queryKey: ["groupFiles", groupId] });
      } else {
        setUploadStatus(`Error: ${response.error}`);
      }
    } catch (e) {}
  };

  return (
    <div className="w-full flex flex-col min-h-[700px]  items-center">
      {/* <h1 className="text-2xl font-orbitron_variable font-bold text-white">
        Files
      </h1> */}
      <CustomErros errors={errors} />
      <div
        className="w-[90%] h-[600px] rounded-2xl border-2 shadow-xl 
                 border-colorOne bg-colorEight flex flex-col items-start 
                 gap-2 p-4 overflow-y-auto"
        aria-label="Files List"
        style={{ overflowY: "auto" }}
      >
        <div className="grid grid-cols-5 gap-4">
          {isLoading ? (
            <p className="text-2xl w-full text-center font-jaro">Loading...</p>
          ) : isError ? (
            <p className="text-2xl w-full text-center font-jaro">
              Error loading files.
            </p>
          ) : groupFiles.length > 0 ? (
            groupFiles.map((file: any, index: number) => (
              <FileDisplay
                file={file}
                index={index}
                key={index}
                onDownloadError={(message) =>
                  setErrors((prevErrors: any) => [...prevErrors, message])
                }
              />
            ))
          ) : (
            <p className=" text-2xl w-full text-center font-jaro text-colorOne">
              No files selected
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-row border border-gray-300 mb-2 items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="p-2 text-white"
        />
        <div className="w-full mr-2">
          <ButtonPrimary
            title={"Uplaod File"}
            onClick={handleFileUpload}
            className="bg-blue-500 text-white"
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
