import create from "zustand";
import { ITextStore } from "../dtos/text.dto";

export const useTextStore = create<ITextStore>()((set, get) => ({
  text: "",
  setText: (text) =>
    set({
      text,
    }),
  clearText: () => set({ text: "" }),
}));
