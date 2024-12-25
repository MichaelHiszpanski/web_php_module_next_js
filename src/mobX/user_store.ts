import { makeAutoObservable, observable } from "mobx";

export class UserStore {
  user = observable({
    email: "",
    password: "",
    userId: "",
    name: "",
    dataBaseID: -99,
    isStudent: false,
  });

  constructor() {
    makeAutoObservable(this);

    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        this.user = JSON.parse(savedUser);
      }
    }
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
    localStorage.setItem("user", JSON.stringify(this.user));
  }
  updateUserName(name: string) {
    this.user = { ...this.user, name };
  }
  updateUserDataBaseID(id: number) {
    this.user = { ...this.user, dataBaseID: id };
    localStorage.setItem("user", JSON.stringify(this.user));
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
    localStorage.removeItem("user");
  }
}

export const userStore = new UserStore();
export default userStore;
