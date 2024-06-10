// @ts-ignore
import LottieWebParser from "lottie-web-parser";
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
  updateColor: (path: string, newColor: number[]) => void;
};

export const useLottieStore = create<State & Actions>((set) => ({
  ...initialState,
  setLottie: (newLottie: Lottie | null) => set({ lottie: newLottie }),
  updateColor: (path: string, newColor: number[]) => {
    set((state) => {
      const newLottie = { ...state.lottie };
      LottieWebParser.replaceColor(newColor, path, newLottie);
      console.log(newLottie);
      return { ...state, lottie: newLottie };
    });
  },
}));
