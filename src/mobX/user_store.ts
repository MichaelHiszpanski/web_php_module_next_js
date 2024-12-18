import { makeAutoObservable } from "mobx";

export class UserStore {
  user = {
    email: "",
    password: "",
    userId: "",
    name: "",
    dataBaseID: -99,
    isStudent: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setUser(
    userDetails: Partial<{
      email: string;
      password: string;
      userId: string;
      name: string;
      dataBaseID: number;
      isStudent: boolean;
    }>
  ) {
    this.user = { ...this.user, ...userDetails };
  }
  updateUserName(name: string) {
    this.user = { ...this.user, name };
  }
  updateUserDataBaseID(id: number) {
    this.user = { ...this.user, dataBaseID: id };
  }
  updateUserIsStudent(isStudent: boolean) {
    this.user = { ...this.user, isStudent: isStudent };
  }

  clearUser() {
    this.user = {
      email: "",
      password: "",
      userId: "",
      name: "",
      dataBaseID: -99,
      isStudent: false,
    };
  }
}

export const userStore = new UserStore();
export default userStore;
