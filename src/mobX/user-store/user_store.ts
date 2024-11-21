import { makeAutoObservable } from "mobx";

export class UserStore {
  user = {
    email: "",
    password: "",
    userId: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  setUser(
    userDetails: Partial<{ email: string; password: string; userId: string }>
  ) {
    this.user = { ...this.user, ...userDetails };
  }

  clearUser() {
    this.user = {
      email: "",
      password: "",
      userId: "",
    };
  }
}

export const userStore = new UserStore();
export default userStore;
