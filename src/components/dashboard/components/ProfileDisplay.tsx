import React from "react";

interface Props {
  user: any;
  isStudent?: boolean;
}
const ProfileDisplay: React.FC<Props> = ({ user, isStudent }) => {
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
              <td className={styleNames}>Student ID:</td>
              <td className={styleP}>{user.studentid}</td>
            </tr>
          ) : (
            <tr>
              <td className={styleNames}>Teacher ID:</td>
              <td className={styleP}>{user.teacherid}</td>
            </tr>
          )}
          <tr>
            <td className={styleNames}>User ID:</td>
            <td className={styleP}>{user.userid}</td>
          </tr>
          <tr>
            <td className={styleNames}>First Name:</td>
            <td className={styleP}>{user.firstname}</td>
          </tr>
          <tr>
            <td className={styleNames}>Last Name:</td>
            <td className={styleP}>{user.lastname}</td>
          </tr>
          <tr>
            <td className={styleNames}>City:</td>
            <td className={styleP}>{user.city}</td>
          </tr>
          <tr>
            <td className={styleNames}>Postcode:</td>
            <td className={styleP}>{user.postcode}</td>
          </tr>
          <tr>
            <td className={styleNames}>Street Name:</td>
            <td className={styleP}>{user.streetname}</td>
          </tr>
          <tr>
            <td className={styleNames}>House Number:</td>
            <td className={styleP}>{user.housenumber}</td>
          </tr>
          <tr>
            <td className={styleNames}>Email:</td>
            <td className={styleP}>{user.useremail}</td>
          </tr>
          <tr>
            <td className={styleNames}>Date Created:</td>
            <td className={styleP}>{user.datecreated}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfileDisplay;
