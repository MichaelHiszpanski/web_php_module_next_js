import { responseDownloadFile } from "@/src/services/routes/fileRoutes";
import { useTranslation } from "@/src/utils/hooks/useTranslation";
import React, { useState } from "react";
import { FaDownload, FaFileAlt, FaIcons, FaTruckLoading } from "react-icons/fa";
interface Props {
  file: { fileid: number; filepath: string };
  index: number;
  onDownloadError: (message: string) => void;
}
const FileDisplay: React.FC<Props> = ({ file, index, onDownloadError }) => {
  const [isDownlaodingFile, setIsDownlaodingFile] = useState(false);
  const { dictionary } = useTranslation();
  const downloadFile = async () => {
    try {
      setIsDownlaodingFile(true);
      const response = await responseDownloadFile(file, onDownloadError);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.filepath || `File_${index + 1}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      onDownloadError(`Download failed: ${error.message}`);
    } finally {
      setIsDownlaodingFile(false);
    }
  };
  return (
    <div className="flex  flex-col items-center justify-between bg-white p-4 rounded-lg shadow-md border-[0.5px]  border-colorFour">
      <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-xl font-bold text-white">
        <FaFileAlt />
      </div>
      <p
        className="mt-2  text-gray-700 text-start w-full"
        style={{ fontSize: "12px" }}
      >
        {file.filepath || `File ${index + 1}`}
      </p>
      <div className="w-full flex flex-row justify-between  bottom-2 ">
        <p
          style={{ fontSize: "14px" }}
          className=" font-mono text-red-600 mr-1"
        >
          {dictionary.file_display[0].download}
        </p>
        <div onClick={downloadFile}>
          {isDownlaodingFile ? <FaTruckLoading /> : <FaDownload />}
        </div>
      </div>
    </div>
  );
};

export default FileDisplay;
