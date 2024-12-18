"use client";

import React, { createContext, ReactNode, useContext } from "react";
import { useLocalObservable } from "mobx-react-lite";
import userStore, { UserStore } from "@/src/mobX/user_store";

type Type = {
  userStore: UserStore;
};

export const StoreContext = createContext<Type | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const store = useLocalObservable(() => ({
    userStore,
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);

  return context;
};
