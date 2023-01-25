import { Dispatch, MouseEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ICoordinates } from "../dtos/coordinates.dto";
import { IPlayerActions } from "../dtos/main.dto";
import { useMainStore } from "../store/mainStore";

export default function Playback({
  setCoords,
  handlePlayer,
}: {
  setCoords: Dispatch<ICoordinates>;
  handlePlayer: Dispatch<IPlayerActions>;
}) {
  const mainStore = useMainStore()
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
    const timer = setTimeout(() => {
      mainStore.setBackEffectVisible(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [mainStore.backEffectVisible]);

  useEffect(() => {
    const timer = setTimeout(() => {
      mainStore.setForwardEffectVisible(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [mainStore.forwardEffectVisible]);

  return (
    <div>
      <div
        className="h-full w-1/4 absolute top-0 left-0 cursor-pointer "
        onClick={() => {
          handlePlayer(IPlayerActions.BACK);
          mainStore.setBackEffectVisible(true);
        }}
      >
        <div
          className="text-[#ffffff65] font-semibold text-2xl opacity-0 p-5 
            transition-all hover:opacity-100 selection-none bg-gradient-to-r
            from-[#ffffff07] w-full h-full flex justify-end items-center
         "
        >
          -10 words
        </div>
        {!mainStore.backEffectVisible ? <></> : <Back />}
      </div>

      <div
        className="h-full w-1/4 absolute top-0 right-0 cursor-pointer "
        onClick={() => {
          handlePlayer(IPlayerActions.FORWARD);
          mainStore.setForwardEffectVisible(true);
        }}
      >
        <div
          className="text-[#ffffff65] font-semibold text-2xl opacity-0 p-5 
            transition-all hover:opacity-100 selection-none bg-gradient-to-l
            from-[#ffffff07] w-full h-full flex justify-start items-center
         "
        >
          +10 words
        </div>
        {!mainStore.forwardEffectVisible ? <></> : <Forward />}
      </div>
    </div>
  );
}

const Back = () => {
  return (
    <motion.div
      className=" absolute top-0 left-0 h-full w-full flex 
            justify-center items-center"
      initial={{ opacity: 1, translateX: 0 }}
      animate={{ opacity: 0.3, translateX: -80 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <motion.div
        initial={{ opacity: 1, translateX: 100 }}
        animate={{ opacity: 0, translateX: -100 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 200,
        }}
        className="flex flex-row items-center space-x-2 selection-none"
      >
        <img src="./back.svg" alt="back" className="w-[4rem] h-[4rem]" />
        <span className="text-[#ffffff65] font-semibold text-2xl ">
          -10 words
        </span>
      </motion.div>
    </motion.div>
  );
};

const Forward = () => {
  return (
    <motion.div
      className=" absolute top-0 right-0 h-full w-full flex 
            justify-center items-center"
      initial={{ opacity: 1, translateX: 0 }}
      animate={{ opacity: 0.3, translateX: 100 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <motion.div
        initial={{ opacity: 1, translateX: -100 }}
        animate={{ opacity: 0, translateX: 100 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 200,
        }}
        className="flex flex-row items-center space-x-2"
      >
        <span className="text-[#ffffff65] font-semibold text-2xl ">
          +10 words
        </span>
        <img src="./forward.svg" alt="back" className="w-[4rem] h-[4rem]" />
      </motion.div>
    </motion.div>
  );
};
