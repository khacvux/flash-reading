export interface IMainStore {
  wordsPerMin: number;
  readSpeed: number;
  changeReadSpeed: (wordsPerMin: number) => void;
  isPause: Boolean;
  setPause: (bool: Boolean) => void;
  isReplay: Boolean;
  setReplay: (bool: Boolean) => void;
  backEffectVisible: Boolean;
  forwardEffectVisible: Boolean;
  setBackEffectVisible: (bool: Boolean) => void;
  setForwardEffectVisible: (bool: Boolean) => void;
}

export enum IPlayerActions {
  BACK = "BACK",
  FORWARD = "FORWARD",
}
