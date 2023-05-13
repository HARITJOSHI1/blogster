/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
"use client";

import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useState,
  useContext,
  type ReactNode,
} from "react";
export interface IUserState {
  id?: string;
  name: string;
  email: string;
}

export interface AppContextState {
  userState: IUserState | null;
}

type AppContextStore = {
  [K in keyof AppContextState & string]: {
    set: Dispatch<SetStateAction<AppContextState[K]>>;
    get: () => AppContextState[K];
  };
};

const GlobalContext = createContext<AppContextStore>({
  userState: {
    set: () => {},
    get: () => null,
  },
});

type Props = {
  children: ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<AppContextState["userState"]>(null);
  const value = {
    userState: {
      set: setUserData,
      get: () => userData,
    },
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
