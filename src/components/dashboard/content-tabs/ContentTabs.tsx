import React, { useEffect, useState } from "react";
import MessagesContentTab from "./content/MessagesContentTab";
import FilesContentTab from "./content/FilesContentTabs";
import StudentsContentTab from "./content/StudentsContentTab";
import StudentNotes from "./content/StudentNotes";
interface Props {
  isBoardOpen: boolean;
  isStudent: boolean;
  currentActiveTab: number;
  groupId: number;
}
const ContentTabs: React.FC<Props> = ({
  isBoardOpen,
  isStudent,
  currentActiveTab,
  groupId,
}) => {
  const [activeTab, setActiveTab] = useState(currentActiveTab);

  useEffect(() => {
    setActiveTab(currentActiveTab);
  }, [currentActiveTab]);

  const content = [
    isStudent === false
      ? { key: "students", element: <StudentsContentTab groupId={groupId} /> }
      : { key: "notes", element: <StudentNotes /> },
    { key: "messages", element: <MessagesContentTab groupId={groupId} /> },
    { key: "files", element: <FilesContentTab groupId={groupId} /> },
  ];

  return (
    <div
      className={`w-full h-ful transform transition-transform duration-400 ${
        isBoardOpen ? " flex translate-y-0" : " hidden -translate-y-full"
      } }`}
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
