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
  const [errors, setErrors] = useState<any>();

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
    const errorsList: any = {};
    if (formData.name.trim() === "") {
      errorsList.name = "First Name field cannot be empty.";
      isValid = false;
    }

    if (formData.lastName.trim() === "") {
      errorsList.lastName = "Last Name field cannot be empty.";
      isValid = false;
    }

    if (formData.street.trim() === "") {
      errorsList.street = "Street field cannot be empty.";
      isValid = false;
    }

    if (formData.city.trim() === "") {
      errorsList.city = "City field cannot be empty.";
      isValid = false;
    }

    if (formData.postcode.trim() === "") {
      errorsList.postcode = "Postcode field cannot be empty.";
      isValid = false;
    }

    if (formData.houseNumber.trim() === "") {
      errorsList.houseNumber = "House Number field cannot be empty.";
      isValid = false;
    }

    if (!role || role.trim() === "" || role === "Select your role") {
      setRoleError("Please select your role.");
      isValid = false;
    } else {
      setRoleError(null);
    }
    setErrors(errorsList);
    return isValid;
  };

  return (
    <div className="p-4 space-y-4">
      <CustomInput
        label="First Name"
        name="name"
        value={formData.name}
        onInputChange={inputChange}
        error={errors.name}
      />
      <CustomInput
        label="Last Name"
        name="lastName"
        value={formData!.lastName}
        onInputChange={inputChange}
        error={errors.lastName}
      />
      <CustomInput
        label="Street"
        name="street"
        value={formData.street}
        onInputChange={inputChange}
        error={errors.street}
      />
      <CustomInput
        label="City"
        name="city"
        value={formData.city}
        onInputChange={inputChange}
        error={errors.city}
      />
      <CustomInput
        label="Postcode"
        name="postcode"
        value={formData.postcode}
        onInputChange={inputChange}
        error={errors.postcode}
      />
      <CustomInput
        label="House Number"
        name="houseNumber"
        value={formData.houseNumber}
        onInputChange={inputChange}
        error={errors.houseNumber}
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
