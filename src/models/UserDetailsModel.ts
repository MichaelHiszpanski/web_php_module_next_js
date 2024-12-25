export interface UserDetailsModel {
  userid: string;
  useremail: string;
  userpassword: string;
  roleid: number;
  datecreated?: Date;
}

export const defaultUserDetails: UserDetailsModel = {
  userid: "",
  useremail: "",
  userpassword: "",
  roleid: 0,
  datecreated: new Date("2024-11-21T16:30:41.392Z"),
};
