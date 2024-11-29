import { studentDisplayCardStyle } from "@/src/consts/styles";
import React from "react";
interface Props {
  item: any;
  onClick: () => void;
}
const StudentDisplayInGroup: React.FC<Props> = ({ item, onClick }) => {
  return (
    <div
      key={item.userid}
      className={studentDisplayCardStyle.container}
      onClick={onClick}
    >
      <div className={studentDisplayCardStyle.fieldContainer}>
        <span className={studentDisplayCardStyle.label}>First Name: </span>
        <span className={studentDisplayCardStyle.value}>{item.firstname}</span>
      </div>
      <div className={studentDisplayCardStyle.fieldContainer}>
        <span className={studentDisplayCardStyle.label}>Last Name: </span>
        <span className={studentDisplayCardStyle.value}>{item.lastname}</span>
      </div>
      <div className={studentDisplayCardStyle.fieldContainer}>
        <span className={studentDisplayCardStyle.label}>City: </span>
        <span className={studentDisplayCardStyle.value}>{item.city}</span>
      </div>
      <div className={studentDisplayCardStyle.fieldContainer}>
        <span className={studentDisplayCardStyle.label}>Post Code: </span>
        <span className={studentDisplayCardStyle.value}>{item.postcode}</span>
      </div>
      <div className={studentDisplayCardStyle.fieldContainer}>
        <span className={studentDisplayCardStyle.label}>Street: </span>
        <span className={studentDisplayCardStyle.value}>{item.streetname}</span>
      </div>
      <div className={studentDisplayCardStyle.fieldContainer}>
        <span className={studentDisplayCardStyle.label}>House No: </span>
        <span className={studentDisplayCardStyle.value}>
          {item.housenumber}
        </span>
      </div>
    </div>
  );
};

export default StudentDisplayInGroup;
