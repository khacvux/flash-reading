export interface ITextStore {
  text: string;
  setText: (text: string | undefined) => void;
  clearText: () => void;
}
