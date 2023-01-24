import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import Menu from "./components/Menu";
import { motion } from "framer-motion";
import { useMainStore } from "./store/mainStore";
import { ICoordinates } from "./dtos/coordinates.dto";
import PlayEffect from "./components/PlayEffect";
import { useTextStore } from "./store/textStore";
import { IPlayerActions } from "./dtos/main.dto";
import Playback from "./components/Playback";

function App() {
  const text = useTextStore((state) => state.text);
  const readSpeed = useMainStore((state) => state.readSpeed);

  const constraintsRef = useRef(null);
  const [i, set_i] = useState<number>(0);
  const [currentText, setCurentText] = useState<string>("Flash Reading!");
  const splited = useMemo(() => text.split(" "), [text]);
  const [coords, setCoords] = useState<ICoordinates>({ x: 0, y: 0 });
  const mainStore = useMainStore();

  const handlePause = () => {
    mainStore.setPause(!mainStore.isPause);
  };

  const handleReplay = () => {
    set_i(0);
    mainStore.setReplay(false);
  };

  const handlePlayer = (action: IPlayerActions): void => {
    switch (action) {
      case IPlayerActions.BACK: {
        if (i <= 0) break;
        set_i(i - 10);
        mainStore.setReplay(false);
        break;
      }
      // FORWARD 10 WORDS
      case IPlayerActions.FORWARD: {
        if (i >= splited.length) break;
        set_i(i + 10);
        mainStore.setReplay(false);
        break;
      }
    }
  };

  useEffect(() => {
    if (!text.length) setCurentText("Flash reading!");

    const timer = setInterval(() => {
      if (mainStore.isPause) {
        setCurentText(splited[i]);
      } else {
        set_i(i + 1);
        setCurentText(splited[i]);
      }
    }, readSpeed);

    if (i >= splited.length && i != 0) {
      mainStore.setReplay(true);
      mainStore.setPause(true);
      return clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [i, text, mainStore.isPause]);

  useEffect(() => {
    set_i(0);
  }, [text]);

  useEffect(() => {
    const handleWindowMouseMove = (event: any) => {
      setCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("click", handleWindowMouseMove);
    return () => {
      window.removeEventListener("click", handleWindowMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleSpaceKeypress = (event: any) => {
      console.log(event.code);
      switch (event.code) {
        case "KeyP": {
          handlePause();
          break;
        }
        case "KeyK": {
          handlePlayer(IPlayerActions.BACK);
          mainStore.setBackEffectVisible(true);
          break;
        }
        case "KeyL": {
          handlePlayer(IPlayerActions.FORWARD);
          mainStore.setForwardEffectVisible(true);
          break;
        }
        case "Comma": {
          mainStore.changeReadSpeed(mainStore.wordsPerMin - 10);
          break;
        }
        case "Period": {
          mainStore.changeReadSpeed(mainStore.wordsPerMin + 10);
          break;
        }
        default:
          break;
      }
    };
    window.addEventListener("keypress", handleSpaceKeypress);
    return () => {
      window.removeEventListener("keypress", handleSpaceKeypress);
    };
  }, [mainStore.isPause, i, mainStore.wordsPerMin]);

  return (
    <motion.div
      className=" w-screen h-screen relative overflow-hidden"
      ref={constraintsRef}
    >
      <div
        className=" w-full h-full flex items-center justify-center relative"
        onClick={handlePause}
      >
        <p className=" text-white font-bold text-4xl mx-3">{currentText}</p>
        {!mainStore.isReplay ? (
          <></>
        ) : !text.length ? (
          <></>
        ) : (
          <button onClick={handleReplay}>
            <ReloadIcon />
          </button>
        )}
      </div>
      <Playback setCoords={setCoords} handlePlayer={handlePlayer} />
      <PlayEffect coords={coords} isPause={mainStore.isPause} />
      <Menu constraintsRef={constraintsRef} />
    </motion.div>
  );
}

export default App;

const ReloadIcon = () => {
  return (
    <svg
      fill="#fff"
      height="2.5rem"
      width="2.5rem"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 489.533 489.533"
    >
      <g>
        <motion.path
          d="M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9
		l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6
		c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6
		C49.575,418.961,150.875,501.261,268.175,488.161z"
        />
      </g>
    </svg>
  );
};
