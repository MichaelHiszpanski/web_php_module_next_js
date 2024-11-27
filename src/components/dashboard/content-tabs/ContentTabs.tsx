import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
interface Props {
  isBoardOpen: boolean;
  isStudent: boolean;
  currentActiveTab: number;
  tabs: string[];
}
const ContentTabs: React.FC<Props> = ({
  isBoardOpen,
  isStudent,
  currentActiveTab,
  tabs,
}) => {
  const [activeTab, setActiveTab] = useState(currentActiveTab);

  useEffect(() => {
    setActiveTab(currentActiveTab);
  }, [currentActiveTab]);
  const content = [
    <div key="tab1">Content for Tab 1</div>,
    <div key="tab2">Content for Tab 2</div>,
    <div key="tab3">Content for Tab 3</div>,
  ];

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () =>
      setActiveTab((prev) => (prev < tabs.length - 1 ? prev + 1 : prev)),
    onSwipedRight: () => setActiveTab((prev) => (prev > 0 ? prev - 1 : prev)),
    //   preventDefaultTouchmoveEvent: true,
    trackTouch: true,
  });

  return (
    <div
      className={`w-full h-ful transform transition-transform duration-400 ${
        isBoardOpen ? " flex translate-y-0" : " hidden -translate-y-full"
      } ${isStudent ? "bg-yellow-500" : "bg-colorSix"}`}
    >
      <div className="w-full flex flex-col" {...swipeHandlers}>
        {/* <div className="flex justify-around border-b border-gray-300">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex-1 text-center py-2 ${
                activeTab === index
                  ? "border-b-2 border-blue-500 font-bold"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div> */}

        <div className="flex-1 p-4">{content[activeTab]}</div>
      </div>
    </div>
  );
};

export default ContentTabs;
