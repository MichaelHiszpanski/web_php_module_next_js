import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import MessagesContentTab from "./content/MessagesContentTab";
import FilesContentTab from "./content/FilesContentTabs";
import StudentsContentTab from "./content/StudentsContentTab";
interface Props {
  isBoardOpen: boolean;
  isStudent: boolean;
  currentActiveTab: number;
}
const ContentTabs: React.FC<Props> = ({
  isBoardOpen,
  isStudent,
  currentActiveTab,
}) => {
  const [activeTab, setActiveTab] = useState(currentActiveTab);

  useEffect(() => {
    setActiveTab(currentActiveTab);
  }, [currentActiveTab]);

  const content = [
    { key: "students", element: <StudentsContentTab /> },
    { key: "messages", element: <MessagesContentTab /> },
    { key: "files", element: <FilesContentTab /> },
  ];

  return (
    <div
      className={`w-full h-ful transform transition-transform duration-400 ${
        isBoardOpen ? " flex translate-y-0" : " hidden -translate-y-full"
      } ${isStudent ? "bg-yellow-500" : "bg-colorSix"}`}
    >
      <div className="w-full flex flex-col">
        <div key={content[activeTab].key} className="flex-1 p-4">
          {content[activeTab].element}
        </div>
      </div>
    </div>
  );
};

export default ContentTabs;
