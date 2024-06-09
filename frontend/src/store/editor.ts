import { create } from "zustand";

type State = {
  selectedLayer: number;
};

const initialState: State = {
  selectedLayer: 0,
};

type Actions = {
  setSelectedLayer: (newLayer: number) => void;
};

export const useSelectedLayer = create<State & Actions>((set) => ({
  ...initialState,
  setSelectedLayer: (newSelectedLayer: number) => {
    set({ selectedLayer: newSelectedLayer });
  },
}));
