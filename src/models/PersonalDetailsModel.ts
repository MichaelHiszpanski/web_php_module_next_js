export interface PersonalDetailModel {
  name: string;
  lastName: string;
  street: string;
  city: string;
  postcode: string;
  houseNumber: string;
  userId: string;
  department?: string;
  type?: string;
  role?: string;
}

export const defaultPersonalDetails: PersonalDetailModel = {
  name: "",
  lastName: "",
  street: "",
  city: "",
  postcode: "",
  houseNumber: "",
  userId: "",
};
