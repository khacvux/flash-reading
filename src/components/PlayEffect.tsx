import { memo, useEffect, useState } from "react";
import { ICoordinates } from "../dtos/coordinates.dto";
import { AnimatePresence, motion } from "framer-motion";

function PlayEffect({
  coords,
  isPause,
}: {
  coords: ICoordinates;
  isPause: Boolean;
}) {
  console.log("rerender");
  const [visible, setVisible] = useState<Boolean>(false);
  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [isPause]);

  if (!visible) return <></>;

  return (
    <div
      className={`absolute z-[10] cursor-default text-white`}
      style={{ top: coords.y - 15, left: coords.x - 15 }}
    >
      {isPause ? <Play /> : <Pause />}
    </div>
  );
}

export default memo(PlayEffect);

function Play() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, translateY: -80 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <svg
        fill="#fff"
        height="2.25rem"
        width="2.25rem"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        enable-background="new 0 0 512 512"
      >
        <motion.path
          d="M464.7,221.5L86.1,7.3C52.5-11.7,25,7.5,25,50v412c0,42.5,27.5,61.7,61.1,42.7l378.6-214.1
	C498.2,271.5,498.2,240.5,464.7,221.5z"
        />
      </svg>
    </motion.div>
  );
}

function Pause() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, translateY: -80 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <svg
        fill="#fff"
        height="3.5rem"
        width="3.5rem"
        viewBox="0 0 24 24"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_2"
      >
        <path
          d="M8.5 7V18"
          stroke="#fff"
          stroke-width="3"
          stroke-linecap="round"
        />
        <path
          d="M15.5 7V12.5V18"
          stroke="#fff"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>
    </motion.div>
  );
}
