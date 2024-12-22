import { userDisplayCardStyle } from "@/src/consts/styles";
import { useTranslation } from "@/src/utils/hooks/useTranslation";
import React from "react";
interface Props {
  item: any;
  onClick: () => void;
}
const UserDisplayInGroup: React.FC<Props> = ({ item, onClick }) => {
  const { dictionary } = useTranslation();
  return (
    <div
      key={item.userid}
      className={userDisplayCardStyle.container}
      onClick={onClick}
    >
      <div className={userDisplayCardStyle.fieldContainer}>
        <span className={userDisplayCardStyle.label}>
          {dictionary.user_display_in_group[0].first_name}{" "}
        </span>
        <span className={userDisplayCardStyle.value}>{item.firstname}</span>
      </div>
      <div className={userDisplayCardStyle.fieldContainer}>
        <span className={userDisplayCardStyle.label}>
          {dictionary.user_display_in_group[0].last_name}{" "}
        </span>
        <span className={userDisplayCardStyle.value}>{item.lastname}</span>
      </div>
      <div className={userDisplayCardStyle.fieldContainer}>
        <span className={userDisplayCardStyle.label}>
          {dictionary.user_display_in_group[0].role}{" "}
        </span>
        <span className={userDisplayCardStyle.value}>
          {item.roledescription}
        </span>
      </div>
      <div className={userDisplayCardStyle.fieldContainer}>
        <span className={userDisplayCardStyle.label}>
          {dictionary.user_display_in_group[0].email}{" "}
        </span>
        <span className={userDisplayCardStyle.value}>{item.useremail}</span>
      </div>
    </div>
  );
};

export default UserDisplayInGroup;
