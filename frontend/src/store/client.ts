import { create } from "zustand";

type State = {
  clientId?: string;
};

const initialState: State = {};

type Actions = {
  setClientId: (clientId: string) => void;
};

export const useClientStore = create<State & Actions>((set) => ({
  ...initialState,
  setClientId: (clientId: string) => {
    set({ clientId });
  },
}));
