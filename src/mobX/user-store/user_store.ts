import { makeAutoObservable } from "mobx";

export class UserStore {
  user = {
    email: "",
    password: "",
    userId: "",
    name: "",
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
    }>
  ) {
    this.user = { ...this.user, ...userDetails };
  }
  updateUserName(name: string) {
    this.user = { ...this.user, name };
  }

  clearUser() {
    this.user = {
      email: "",
      password: "",
      userId: "",
      name: "",
    };
  }
}

export const userStore = new UserStore();
export default userStore;
