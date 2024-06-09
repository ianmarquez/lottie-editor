import { create } from "zustand";

type State = {
  loading: boolean;
};

const initialState: State = {
  loading: false,
};

type Actions = {
  setLoading: (loadingState: boolean) => void;
};

export const useLoadingStore = create<State & Actions>((set) => ({
  ...initialState,
  setLoading: (newLoadingState: boolean) => {
    set({ loading: newLoadingState });
  },
}));
