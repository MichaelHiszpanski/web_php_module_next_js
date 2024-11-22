export interface UserDetailsModel {
  userid: string;
  userEmail: string;
  userPassword: string;
  roleId: number;
  datecreated?: Date;
}

export const defaultUserDetails: UserDetailsModel = {
  userid: "",
  userEmail: "",
  userPassword: "",
  roleId: 0,
  datecreated: new Date("2024-11-21T16:30:41.392Z"),
};
