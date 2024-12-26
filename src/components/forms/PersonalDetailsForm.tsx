import React, { FC, useState, ChangeEvent } from "react";
import CustomInput from "../custom-input/CustomInput";
import ButtonPrimary from "../buttons/button-primary/ButtonPrimary";
import AnimatedDropdown from "../custom-dropdown/CustomDropDown";
import { PersonalDetailModel } from "@/src/models/PersonalDetailsModel";

interface Props {
  onSubmit: (formData: PersonalDetailModel) => void;
}

const PersonalDetailsForm: FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    street: "",
    city: "",
    postcode: "",
    houseNumber: "",
    userId: "",
    department: "",
    type: "",
    role: "",
  });

  const [role, setRole] = React.useState<string | null>(null);
  const [roleError, setRoleError] = React.useState<string | null>(null);
  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!validateInputs()) return;
    onSubmit(formData);
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
    if (!role || role.trim() === "" || role === "Select your role") {
      setRoleError("Please select your role.");
      isValid = false;
    } else {
      setRoleError(null);
    }

    return isValid;
  };

  return (
    <div className="p-4 space-y-4">
      <CustomInput
        label="First Name"
        name="name"
        value={formData.name}
        onInputChange={inputChange}
      />
      <CustomInput
        label="Last Name"
        name="lastName"
        value={formData!.lastName}
        onInputChange={inputChange}
      />
      <CustomInput
        label="Street"
        name="street"
        value={formData.street}
        onInputChange={inputChange}
      />
      <CustomInput
        label="City"
        name="city"
        value={formData.city}
        onInputChange={inputChange}
      />
      <CustomInput
        label="Postcode"
        name="postcode"
        value={formData.postcode}
        onInputChange={inputChange}
      />
      <CustomInput
        label="House Number"
        name="houseNumber"
        value={formData.houseNumber}
        onInputChange={inputChange}
      />
      <AnimatedDropdown
        label="Select your role"
        options={["Select your role", "Student", "Teacher"]}
        onSelect={(option: any) => {
          setRole(option);
          setFormData((prev) => ({ ...prev, role: option }));
        }}
        error={roleError}
      />
      {role === "Teacher" && (
        <CustomInput
          label="Teacher type"
          name="type"
          value={formData.type}
          onInputChange={inputChange}
        />
      )}
      <ButtonPrimary title={"OK"} onClick={handleSubmit} />
    </div>
  );
};

export default PersonalDetailsForm;
