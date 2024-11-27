import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
interface Props {
  isBoardOpen: boolean;
  isStudent: boolean;
  tabs: string[];
  onChnageTab: (activeTab: number) => void;
}
const TopPanel: React.FC<Props> = ({
  isBoardOpen,
  isStudent,
  tabs,
  onChnageTab,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    onChnageTab(activeTab);
  }, [activeTab, onChnageTab]);

  return (
    <div
      className={`w-full  h-[60px] transform transition-transform duration-400 ${
        isBoardOpen ? " flex translate-y-0" : " hidden -translate-y-full"
      } ${isStudent ? "bg-yellow-500" : "bg-colorSix"}`}
    >
      <div className="flex w-full justify-around border-b-[2px] border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex-1 text-center py-2 ${
              activeTab === index
                ? "border-b-[5px] border-colorSeven text-colorOne font-bold"
                : "text-white"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopPanel;
