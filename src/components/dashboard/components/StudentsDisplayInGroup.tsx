import { studentDisplayCardStyle } from "@/src/consts/styles";
import { useTranslation } from "@/src/utils/hooks/useTranslation";
import React from "react";
interface Props {
  item: any;
  onClick: () => void;
}
const StudentDisplayInGroup: React.FC<Props> = ({ item, onClick }) => {
  const { dictionary } = useTranslation();
  return (
    <div
      key={item.userid}
      className={studentDisplayCardStyle.container}
      onClick={onClick}
    >
      <div className={studentDisplayCardStyle.fieldContainer}>
        <span className={studentDisplayCardStyle.label}>
          {dictionary.students_display_in_group[0].first_name}{" "}
        </span>
        <span className={studentDisplayCardStyle.value}>{item.firstname}</span>
      </div>
      <div className={studentDisplayCardStyle.fieldContainer}>
        <span className={studentDisplayCardStyle.label}>
          {dictionary.students_display_in_group[0].last_name}{" "}
        </span>
        <span className={studentDisplayCardStyle.value}>{item.lastname}</span>
      </div>
      <div className={studentDisplayCardStyle.fieldContainer}>
        <span className={studentDisplayCardStyle.label}>
          {dictionary.students_display_in_group[0].city}{" "}
        </span>
        <span className={studentDisplayCardStyle.value}>{item.city}</span>
      </div>
      <div className={studentDisplayCardStyle.fieldContainer}>
        <span className={studentDisplayCardStyle.label}>
          {dictionary.students_display_in_group[0].post_code}{" "}
        </span>
        <span className={studentDisplayCardStyle.value}>{item.postcode}</span>
      </div>
      <div className={studentDisplayCardStyle.fieldContainer}>
        <span className={studentDisplayCardStyle.label}>
          {dictionary.students_display_in_group[0].street}{" "}
        </span>
        <span className={studentDisplayCardStyle.value}>{item.streetname}</span>
      </div>
      <div className={studentDisplayCardStyle.fieldContainer}>
        <span className={studentDisplayCardStyle.label}>
          {dictionary.students_display_in_group[0].house_no}{" "}
        </span>
        <span className={studentDisplayCardStyle.value}>
          {item.housenumber}
        </span>
      </div>
    </div>
  );
};

export default StudentDisplayInGroup;
