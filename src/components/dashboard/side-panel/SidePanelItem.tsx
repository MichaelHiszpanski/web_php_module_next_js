import { sidePanelItemStyling } from "@/src/consts/styles";
import React from "react";
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
      <div className="border-b-[0.5px] border-b-colorSix shadow-sm ">
        <h3 className={sidePanelItemStyling.name}>Name: {groupName}</h3>
      </div>
      <p className={sidePanelItemStyling.field}>Info: {description}</p>
      <p className={sidePanelItemStyling.field}>ID: {groupid.toString()}</p>
      <p className={sidePanelItemStyling.field}>
        Created: {dateCreated || "N/A"}
      </p>
    </div>
  );
};

export default SidePanelItem;
