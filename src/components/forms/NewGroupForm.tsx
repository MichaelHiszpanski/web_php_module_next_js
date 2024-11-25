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
  });
  const [errors, setErrors] = useState<any>({
    groupName: "",
    groupDescription: "",
  });

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGroupData({ ...groupData, [name]: value });

    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = () => {
    if (!validateInputs()) return;
    onSubmit(groupData);
  };

  const validateInputs = () => {
    let isValid = true;
    const errorsList: any = {};

    if (groupData.groupName.trim() === "") {
      errorsList.groupName = "Please provide group Name";
      isValid = false;
    }
    if (groupData.groupDescription.trim() === "") {
      errorsList.groupDescription = "Please provide group Description";
      isValid = false;
    }
    setErrors(errorsList);
    return isValid;
  };

  return (
    <div className="p-4 space-y-4">
      <CustomInput
        label="Group Name"
        name="groupName"
        value={groupData.groupName}
        onInputChange={inputChange}
        error={errors.groupName}
      />
      <CustomInput
        label="Group description"
        name="groupDescription"
        value={groupData.groupDescription}
        onInputChange={inputChange}
        error={errors.groupDescription}
      />

      <ButtonPrimary title={"OK"} onClick={handleSubmit} />
    </div>
  );
};

export default NewGroupForm;
