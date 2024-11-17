import { makeAutoObservable } from "mobx";

export class UserStore {
  user = [];

  constructor() {
    makeAutoObservable(this);
  }

  setUser(userDetails: any) {
    this.user = userDetails;
  }

  clearUser() {
    this.user = [];
  }
}

export const userStore = new UserStore();
export default userStore;
