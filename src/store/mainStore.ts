import create from "zustand";
import { IMainStore } from "../dtos/main.dto";
import { persist } from "zustand/middleware";

export const useMainStore = create<IMainStore>()(
  persist(
    (set, get) => ({
      readSpeed: 500, //number of miliseconds for visible a word
      wordsPerMin: 120,
      changeReadSpeed: (wordsPerMin) => {
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
    }),
    {
      name: "flash-reading",
    }
  )
);
