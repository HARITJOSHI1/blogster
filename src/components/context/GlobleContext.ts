/* eslint-disable @typescript-eslint/no-empty-function */
import { type Dispatch, type SetStateAction, createContext } from "react";
export interface IUserState {
  id: string;
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
}

export const GlobleContextStore = createContext<AppContextStore>({
  userState: {
    set: () => {},
    get: () => null
  },
});
