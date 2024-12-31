import { useTranslation } from "@/src/utils/hooks/useTranslation";
import { dateTimeFormater } from "@/src/utils/tools/date_formater";
import React, { useState } from "react";
import CustomInput from "../../custom-input/CustomInput";
import { PersonalDetailModel } from "@/src/models/PersonalDetailsModel";
import userStore from "@/src/mobX/user_store";

interface Props {
  user: any;
  isStudent?: boolean;
  onFormDataUpdated: (updatedData: any) => void;
}
const ProfileDisplay: React.FC<Props> = ({
  user,
  isStudent,
  onFormDataUpdated,
}) => {
  const { dictionary } = useTranslation();
  const [dataForm, setDataForm] = useState<PersonalDetailModel>({
    name: user.firstname,
    lastName: user.lastname,
    city: user.city,
    street: user.streetname,
    postcode: user.postcode,
    houseNumber: user.housenumber,
    userId: user.userid,
  });
  const handleInputChange = (name: string, value: string) => {
    const updatedData = {
      ...dataForm,
      [name]: value,
    };
    setDataForm(updatedData);
    console.log("Profiel Display data:", updatedData);
    onFormDataUpdated(updatedData);
  };

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
            <td className={styleP}>
              <CustomInput
                label={"First Name"}
                value={dataForm.name}
                name="name"
                onInputChange={(e) => handleInputChange("name", e.target.value)}
                isLabel={false}
                className=" bg-yellow-300 mt-3"
              />
            </td>
          </tr>
          <tr>
            <td className={styleNames}>
              {dictionary.profile_details[0].last_name}
            </td>
            <td className={styleP}>
              <CustomInput
                label={"Last Name"}
                value={dataForm.lastName}
                name="lastName"
                onInputChange={(e) =>
                  handleInputChange("lastName", e.target.value)
                }
                isLabel={false}
                className=" bg-yellow-300 mt-3"
              />
            </td>
          </tr>
          <tr>
            <td className={styleNames}>{dictionary.profile_details[0].city}</td>
            <td className={styleP}>
              <CustomInput
                label={"City"}
                value={dataForm.city}
                name="city"
                onInputChange={(e) => handleInputChange("city", e.target.value)}
                isLabel={false}
                className=" bg-yellow-300 mt-3"
              />
            </td>
          </tr>
          <tr>
            <td className={styleNames}>
              {dictionary.profile_details[0].post_code}
            </td>
            <td className={styleP}>
              <CustomInput
                label={"PostCode"}
                value={dataForm.postcode}
                name="postcode"
                onInputChange={(e) =>
                  handleInputChange("postcode", e.target.value)
                }
                isLabel={false}
                className=" bg-yellow-300 mt-3"
              />
            </td>
          </tr>
          <tr>
            <td className={styleNames}>
              {dictionary.profile_details[0].street}
            </td>
            <td className={styleP}>
              <CustomInput
                label={"Street"}
                value={dataForm.street}
                name="street"
                onInputChange={(e) =>
                  handleInputChange("street", e.target.value)
                }
                isLabel={false}
                className=" bg-yellow-300 mt-3"
              />
            </td>
          </tr>
          <tr>
            <td className={styleNames}>
              {dictionary.profile_details[0].house_no}
            </td>
            <td className={styleP}>
              <CustomInput
                label={"House No"}
                value={dataForm.houseNumber}
                name="houseNumber"
                onInputChange={(e) =>
                  handleInputChange("houseNumber", e.target.value)
                }
                isLabel={false}
                className=" bg-yellow-300 mt-3"
              />
            </td>
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
