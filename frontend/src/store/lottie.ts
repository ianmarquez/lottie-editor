import { create } from "zustand";
import { updateColor } from "../utils/LottieParser";

type Lottie = Record<string, any>;

type State = {
  lottie: Lottie | null;
  speed: number;
};

const initialState: State = {
  lottie: null,
  speed: 1,
};

type Actions = {
  setLottie: (newLottie: Lottie | null) => void;
  updateColor: (path: string, newColor: number[]) => void;
  deleteLayer: (path: string) => void;
  changeSpeed: (multiplier: number, currentFrameRate: number) => void;
};

export const useLottieStore = create<State & Actions>((set) => ({
  ...initialState,
  setLottie: (newLottie: Lottie | null) => set({ lottie: newLottie }),
  changeSpeed: (multiplier: number, currentFrameRate: number) => {
    set((state) => {
      const newLottie = { ...state.lottie };
      const currentMultiplier = state.speed;
      const originalFrameRate = currentFrameRate / currentMultiplier;
      const newFramerate = multiplier * originalFrameRate;
      newLottie.fr = newFramerate;
      return {
        speed: multiplier,
        lottie: newLottie,
      };
    });
  },
  updateColor: (path: string, newColor: number[]) => {
    set((state) => {
      const newLottie = { ...state.lottie };
      updateColor(newColor, path, newLottie);
      return { ...state, lottie: newLottie };
    });
  },
  deleteLayer: (path: string) => {
    set((state) => {
      let newLottie = { ...state.lottie };
      const [root, index] = path.split(".");
      newLottie[root].splice(index, 1);
      return { ...state, lottie: newLottie };
    });
  },
}));
