import { IUser } from "@/interfaces";
import { create } from "zustand";

const useUsersStore = create((set) => ({
  //   count: 1,
  //   inc: () => set((state) => ({ count: state.count + 1 })),
  user: null,
  setUser: (user: IUser) => set(() => ({ user })),
}));

export interface IUsersStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

export default useUsersStore;
