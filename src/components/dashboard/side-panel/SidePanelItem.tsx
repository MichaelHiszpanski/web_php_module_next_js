import { sidePanelItemStyling } from "@/src/consts/styles";
import { dateTimeFormater } from "@/src/utils/tools/date_formater";
import React from "react";
import { FaTimes, FaTimesCircle } from "react-icons/fa";
interface Props {
  groupName: string;
  description: string;
  dateCreated: string;
  groupid: number;
  onClick: (groupid: number) => void;
}
const SidePanelItem: React.FC<Props> = ({
  groupName,
  description,
  dateCreated,
  groupid,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(groupid)}
      className={sidePanelItemStyling.container}
    >
      <div className="border-b-[1.5px] border-b-colorNine shadow-sm my-1">
        <h3 className={sidePanelItemStyling.name} style={{ fontSize: "14px" }}>
          Name: {groupName}
        </h3>
      </div>
      <p className={sidePanelItemStyling.field} style={{ fontSize: "12px" }}>
        <strong>Info:</strong> {description}
      </p>
      {/* <p className={sidePanelItemStyling.field} style={{ fontSize: "12px" }}>
        ID: {groupid.toString()}
      </p> */}
      <p className={sidePanelItemStyling.field} style={{ fontSize: "12px" }}>
        <strong>Created:</strong>
      </p>
      <p className={sidePanelItemStyling.field} style={{ fontSize: "12px" }}>
        {dateTimeFormater(dateCreated) || "N/A"}
      </p>
    </div>
  );
};

export default SidePanelItem;
