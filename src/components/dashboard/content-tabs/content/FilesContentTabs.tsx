import ButtonPrimary from "@/src/components/buttons/button-primary/ButtonPrimary";
import userStore from "@/src/mobX/user_store";
import {
  responsePostFileToGroup,
  useGetGroupFilesList,
} from "@/src/routes/fileRoutes";
import React, { useRef, useState } from "react";
import FileDisplay from "../../components/FileDisplay";
import CustomErros from "@/src/components/custom-errors/CustomErrors";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "@/src/utils/hooks/useTranslation";
interface Props {
  groupId: number;
}
const FilesContentTab: React.FC<Props> = ({ groupId }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [errors, setErrors] = useState<any>([]);
  const queryClient = useQueryClient();
  const { dictionary } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      setUploadStatus(dictionary.files_content_tab[0].no_file_selected);
      return;
    }

    const response = await responsePostFileToGroup(
      groupId,
      userStore.user.userId,
      selectedFile
    );

    if (response.success) {
      setUploadStatus(
        dictionary.files_content_tab[0].file_uploaded_successfuly
      );
      queryClient.invalidateQueries({ queryKey: ["groupFiles", groupId] });
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      setUploadStatus(`Error: ${response.error}`);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-[700px]  items-center">
      {uploadStatus && (
        <p className="mt-2 text-2xl mb-2 text-white">{uploadStatus}</p>
      )}
      <div
        className="w-[90%] h-[600px] rounded-2xl border-2 shadow-xl 
                 border-colorOne bg-colorEight flex flex-col items-start 
                 gap-2 p-4 overflow-y-auto"
        aria-label="Files List"
        style={{ overflowY: "auto" }}
      >
        <div className="grid grid-cols-5 gap-4">
          {isLoading ? (
            <p className="text-2xl w-full text-center font-jaro">
              {dictionary.files_content_tab[0].loading}
            </p>
          ) : isError ? (
            <p className="text-2xl w-full text-center font-jaro">
              {dictionary.files_content_tab[0].error_loadoing}
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
              {dictionary.files_content_tab[0].no_files_selected}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-row border border-gray-300 mb-2 items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="p-2 text-white"
          ref={fileInputRef}
        />
        <div className="w-full mr-2">
          <ButtonPrimary
            title={dictionary.files_content_tab[0].upload_file}
            onClick={handleFileUpload}
            className="bg-blue-500 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default FilesContentTab;
