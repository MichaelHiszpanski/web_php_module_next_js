import React from "react";
interface Props {
  groupName: string;
  description: string;
  dateCreated: string;
  groupid: number;
}
const SidePanelItem: React.FC<Props> = ({
  groupName,
  description,
  dateCreated,
  groupid,
}) => {
  return (
    <div className="p-2 bg-white border  border-colorSeven shadow-sm rounded-xl m-2 overflow-hidden">
      <h3 className=" text-lg text-colorFour font-orbitron_variable">
        Name: {groupName}
      </h3>
      <p>Info: {description}</p>
      <p>Group ID: {groupid.toString()}</p>
      <p>Date Created: {dateCreated || "N/A"}</p>
    </div>
  );
};

export default SidePanelItem;
