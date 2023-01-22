export interface IMainStore {
  wordsPerMin: number;
  readSpeed: number;
  changeReadSpeed: (wordsPerMin: number) => void;
  isPause: Boolean;
  setPause: (bool: Boolean) => void;
  isReplay: Boolean;
  setReplay: (bool: Boolean) => void;
}
