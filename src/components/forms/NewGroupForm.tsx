import React, { FC, useState, ChangeEvent } from "react";
import CustomInput from "../custom-input/CustomInput";
import ButtonPrimary from "../buttons/button-primary/ButtonPrimary";
import { NewGroupModel } from "@/src/models/NewGroupModel";

interface Props {
  onSubmit: (formData: NewGroupModel) => void;
}

const NewGroupForm: FC<Props> = ({ onSubmit }) => {
  const [groupData, setGroupData] = useState<NewGroupModel>({
    groupName: "",
    groupDescription: "",
    teacherID: -99,
  });

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGroupData({ ...groupData, [name]: value });
  };

  const handleSubmit = () => {
    if (!validateInputs()) return;
    onSubmit(groupData);
  };

  const validateInputs = () => {
    let isValid = true;

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(emailAddress)) {
    //   setEmailError("Please enter a valid email address.");
    //   isValid = false;
    // } else if (emailAddress.trim() === "") {
    //   setEmailError("Email address cannot be empty.");
    //   isValid = false;
    // } else {
    //   setEmailError(null);
    // }

    // if (password.trim() === "") {
    //   setPasswordError("Password cannot be empty.");
    //   isValid = false;
    // } else {
    //   setPasswordError(null);
    // }
    // if (passwordConfirm.trim() === "") {
    //   setPasswordConfirmError("Confirm password cannot be empty.");
    //   isValid = false;
    // } else if (passwordConfirm !== password) {
    //   setPasswordConfirmError(
    //     "Yur confirmation password has to match a password"
    //   );
    //   isValid = false;
    // } else {
    //   setPasswordConfirmError(null);
    // }

    return isValid;
  };

  return (
    <div className="p-4 space-y-4">
      <CustomInput
        label="Group Name"
        name="groupName"
        value={groupData.groupName}
        onInputChange={inputChange}
      />
      <CustomInput
        label="Group description"
        name="description"
        value={groupData.groupDescription}
        onInputChange={inputChange}
      />

      <ButtonPrimary title={"OK"} onClick={handleSubmit} />
    </div>
  );
};

export default NewGroupForm;
