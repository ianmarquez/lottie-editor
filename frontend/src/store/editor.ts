import { create } from "zustand";

const LAYERS = {
  MAIN_LAYER: "MAIN_LAYER",
} as const;

export type LayerTypes = (typeof LAYERS)[keyof typeof LAYERS];

type State = {
  selectedLayer: LayerTypes;
  idx?: number;
};

const initialState: State = {
  selectedLayer: LAYERS.MAIN_LAYER,
};

type Actions = {
  setSelectedLayer: (newLayer: LayerTypes) => void;
};

export const useLoadingStore = create<State & Actions>((set) => ({
  ...initialState,
  setSelectedLayer: (newSelectedLayer: LayerTypes) => {
    set({ selectedLayer: newSelectedLayer });
  },
}));
