import { sidePanelItemStyling } from "@/src/consts/styles";
import { responseDeleteGroup } from "@/src/routes/groupRoutes";
import { useTranslation } from "@/src/utils/hooks/useTranslation";
import { dateTimeFormater } from "@/src/utils/tools/date_formater";
import React from "react";
import { IoTrashBin } from "react-icons/io5";

interface Props {
  groupName: string;
  description: string;
  dateCreated: string;
  groupid: number;
  onClick: (groupid: number) => void;
  isStudent: boolean;
}
const SidePanelItem: React.FC<Props> = ({
  groupName,
  description,
  dateCreated,
  groupid,
  onClick,
  isStudent,
}) => {
  const { dictionary } = useTranslation();
  const deleteGroup = async (groupID: number) => {
    const deleteGroupConfirmation = window.confirm(
      "Are you sure you want to delete this Group?"
    );

    if (deleteGroupConfirmation) {
      const result = await responseDeleteGroup(groupID);
      if (result.error) {
        alert(`Error: ${result.error}`);
      } else {
        alert("Group Deleted successfully!");
      }
    } else {
      alert("Group Deletion cancelled.");
    }
  };
  return (
    <div
      onClick={() => onClick(groupid)}
      className={sidePanelItemStyling.container}
    >
      <div className="border-b-[1.5px] border-b-colorNine shadow-sm my-1">
        <h3 className={sidePanelItemStyling.name} style={{ fontSize: "14px" }}>
          {dictionary.side_panel_item[0].name} {groupName}
        </h3>
      </div>
      <p className={sidePanelItemStyling.field} style={{ fontSize: "12px" }}>
        <strong>{dictionary.side_panel_item[0].info}</strong> {description}
      </p>
      {/* <p className={sidePanelItemStyling.field} style={{ fontSize: "12px" }}>
        ID: {groupid.toString()}
      </p> */}
      <p className={sidePanelItemStyling.field} style={{ fontSize: "12px" }}>
        <strong> {dictionary.side_panel_item[0].created} </strong>
      </p>
      <div className=" flex flex-row w-full justify-between">
        <p className={sidePanelItemStyling.field} style={{ fontSize: "12px" }}>
          {dateTimeFormater(dateCreated) || "N/A"}
        </p>
        {isStudent == false && (
          <IoTrashBin
            className=" cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              deleteGroup(groupid);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SidePanelItem;
