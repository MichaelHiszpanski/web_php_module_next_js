import { useTranslation } from "@/src/utils/hooks/useTranslation";
import { dateTimeFormater } from "@/src/utils/tools/date_formater";
import React from "react";

interface Props {
  user: any;
  isStudent?: boolean;
}
const ProfileDisplay: React.FC<Props> = ({ user, isStudent }) => {
  const { dictionary } = useTranslation();
  const styleP =
    "font-mono text-xl pl-5 border-b-[0.5px] border-colorSrcTwo  bg-white  text-colorOne";
  const styleNames =
    "font-bold pr-4 border-r text-xl border-colorFive font-orbitron_variable text-white";
  return (
    <div className=" border border-colorFive overflow-hidden bg-gradient-to-r from-colorSrcOne via-colorSrcTwo to-colorSrcThree  rounded-xl p-4 ">
      <table className="w-full  p-4 rounded-sm overflow-hidden">
        <tbody>
          {isStudent == true ? (
            <tr>
              <td className={styleNames}>
                {dictionary.profile_details[0].student_id}
              </td>
              <td className={styleP}>{user.studentid}</td>
            </tr>
          ) : (
            <tr>
              <td className={styleNames}>
                {dictionary.profile_details[0].teacher_id}
              </td>
              <td className={styleP}>{user.teacherid}</td>
            </tr>
          )}
          <tr>
            <td className={styleNames}>
              {dictionary.profile_details[0].user_id}
            </td>
            <td className={styleP}>{user.userid}</td>
          </tr>
          <tr>
            <td className={styleNames}>
              {dictionary.profile_details[0].first_name}
            </td>
            <td className={styleP}>{user.firstname}</td>
          </tr>
          <tr>
            <td className={styleNames}>
              {dictionary.profile_details[0].last_name}
            </td>
            <td className={styleP}>{user.lastname}</td>
          </tr>
          <tr>
            <td className={styleNames}>{dictionary.profile_details[0].city}</td>
            <td className={styleP}>{user.city}</td>
          </tr>
          <tr>
            <td className={styleNames}>
              {dictionary.profile_details[0].post_code}
            </td>
            <td className={styleP}>{user.postcode}</td>
          </tr>
          <tr>
            <td className={styleNames}>
              {dictionary.profile_details[0].street}
            </td>
            <td className={styleP}>{user.streetname}</td>
          </tr>
          <tr>
            <td className={styleNames}>
              {dictionary.profile_details[0].house_no}
            </td>
            <td className={styleP}>{user.housenumber}</td>
          </tr>
          <tr>
            <td className={styleNames}>
              {dictionary.profile_details[0].email}
            </td>
            <td className={styleP}>{user.useremail}</td>
          </tr>
          <tr>
            <td className={styleNames}>
              {dictionary.profile_details[0].date_created}
            </td>
            <td className={styleP}>{dateTimeFormater(user.datecreated)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfileDisplay;
