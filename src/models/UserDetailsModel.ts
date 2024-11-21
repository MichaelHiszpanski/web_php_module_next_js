export interface UserDetailsModel {
  name: string;
  lastName: string;
  street: string;
  city: string;
  postcode: string;
  houseNumber: string;
  role: string;
  type?: string;
}

export const defaultUserDetails: UserDetailsModel = {
  name: "",
  lastName: "",
  street: "",
  city: "",
  postcode: "",
  houseNumber: "",
  role: "",
};
