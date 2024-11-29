import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
interface Props {
  isBoardOpen: boolean;
  isStudent: boolean;
  onChnageTab: (activeTab: number) => void;
}
const TopPanel: React.FC<Props> = ({ isBoardOpen, isStudent, onChnageTab }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Students", "Messages", "Files"];

  useEffect(() => {
    onChnageTab(activeTab);
  }, [activeTab, onChnageTab]);

  return (
    <div
      className={`w-full  h-[60px] transform transition-transform duration-400 ${
        isBoardOpen ? " flex translate-y-0" : " hidden -translate-y-full"
      } ${isStudent ? "bg-yellow-500" : "bg-colorSix"}`}
    >
      <div className=" relative flex w-full justify-around border-b-[2px] border-gray-300 transition-all duration-500">
        <div
          className="absolute bottom-0 left-0 h-[3px]  bg-colorOne transition-transform duration-500"
          style={{
            width: `${100 / tabs.length}%`,
            transform: `translateX(${activeTab * 100}%)`,
          }}
        ></div>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex-1 text-center py-2 mx-10 ${
              activeTab === index
                ? "font-bold"
                : "text-white transition-colors duration-300"
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
