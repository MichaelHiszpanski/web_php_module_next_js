import { userDisplayCardStyle } from "@/src/consts/styles";
import React from "react";
interface Props {
  item: any;
  onClick: () => void;
}
const UserDisplayInGroup: React.FC<Props> = ({ item, onClick }) => {
  return (
    <div
      key={item.userid}
      className={userDisplayCardStyle.container}
      onClick={onClick}
    >
      <div className={userDisplayCardStyle.fieldContainer}>
        <span className={userDisplayCardStyle.label}>First Name: </span>
        <span className={userDisplayCardStyle.value}>{item.firstname}</span>
      </div>
      <div className={userDisplayCardStyle.fieldContainer}>
        <span className={userDisplayCardStyle.label}>Last Name: </span>
        <span className={userDisplayCardStyle.value}>{item.lastname}</span>
      </div>
      <div className={userDisplayCardStyle.fieldContainer}>
        <span className={userDisplayCardStyle.label}>Role: </span>
        <span className={userDisplayCardStyle.value}>
          {item.roledescription}
        </span>
      </div>
      <div className={userDisplayCardStyle.fieldContainer}>
        <span className={userDisplayCardStyle.label}>Email: </span>
        <span className={userDisplayCardStyle.value}>{item.useremail}</span>
      </div>
    </div>
  );
};

export default UserDisplayInGroup;
