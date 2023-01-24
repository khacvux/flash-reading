import create from "zustand";
import { IMainStore } from "../dtos/main.dto";
import { persist } from "zustand/middleware";

export const useMainStore = create<IMainStore>()(
  persist(
    (set, get) => ({
      readSpeed: 500, //number of miliseconds for visible a word
      wordsPerMin: 120,
      changeReadSpeed: (wordsPerMin) => {
        if (wordsPerMin > 1000 || wordsPerMin <= 0) return;
        set({
          readSpeed: 60000 / wordsPerMin,
          wordsPerMin,
        });
      },
      isPause: false,
      setPause: (bool) => {
        set({
          isPause: bool,
        });
      },
      isReplay: false,
      setReplay: (bool) => {
        set({
          isReplay: bool,
        });
      },
      backEffectVisible: false,
      forwardEffectVisible: false,
      setBackEffectVisible: (bool) => {
        set({ backEffectVisible: bool });
      },
      setForwardEffectVisible: (bool) => {
        set({ forwardEffectVisible: bool });
      },
    }),
    {
      name: "flash-reading",
    }
  )
);
