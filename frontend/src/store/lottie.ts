import { create } from "zustand";

type Lottie = Record<string, any>;

type State = {
  lottie: Lottie | null;
};

const initialState: State = {
  lottie: null,
};

type Actions = {
  setLottie: (newLottie: Lottie | null) => void;
};

export const useLottieStore = create<State & Actions>((set) => ({
  ...initialState,
  setLottie: (newLottie: Lottie | null) => set({ lottie: newLottie }),
}));
