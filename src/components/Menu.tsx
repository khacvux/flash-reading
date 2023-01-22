import { ChangeEvent, memo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMainStore } from "../store/mainStore";
import Slider from "./Slider";
import { Tooltip } from "@mui/material";
import { useTextStore } from "../store/textStore";

function Menu({ constraintsRef }: any) {
  const [visible, setVisible] = useState<Boolean>();
  const [showSettings, setShowSettings] = useState<Boolean>(false);
  const setText = useTextStore((state) => state.setText);
  const [textarea, setTextarea] = useState<string>();
  const clearText = useTextStore((state) => state.clearText);
  const mainStore = useMainStore()

  const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextarea(event.target.value);
  };
  const handleSubmit = () => {
    if (textarea?.length) {
        setText(textarea);
        mainStore.setPause(false)
        mainStore.setReplay(false)
    }
  };
  return (
    <motion.div
      className={`min-w-[70px] min-h-[70px] flex items-center justify-center 
        absolute cursor-pointer top-5 right-5 flex-col space-y-2`}
      drag
      dragConstraints={constraintsRef}
    >
      <motion.div
        className={`w-[42px] h-[42px] rounded-xl overflow-hidden 
            flex flex-col space-y-2  ${!visible ? "bg-white rounded-lg" : ""}`}
        whileHover={{ width: "350px", height: "560px" }}
        whileTap={{ width: "350px", height: "560px" }}
        onHoverStart={() => setVisible(true)}
        onHoverEnd={() => {
          setVisible(false);
          setShowSettings(false);
        }}
      >
        {!visible ? (
          <></>
        ) : (
          <div
            className="w-full h-[450px] flex flex-col space-y-2 bg-white 
          z-[2] rounded-2xl p-2"
          >
            <div className=" w-full flex-1">
              <textarea
                className="resize-none outline-none bg-[#73777B20] w-full 
                    min-h-full rounded-lg px-[5px]"
                value={textarea}
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className="flex flex-row items-center justify-center space-x-2">
              <motion.div
                className="bg-black text-white py-[3px] text-[1rem] rounded-xl 
                        font-semibold w-[4.5rem] flex items-center justify-center"
                whileHover={{ width: "5.5rem" }}
                onClick={handleSubmit}
              >
                Read
              </motion.div>

              <div className="flex-1 flex flex-row justify-end space-x-2">
                <Tooltip title="Clear text" placement="bottom">
                  <button
                    className="w-[35px] h-[35px] flex justify-center items-center 
                            bg-[#73777B25] rounded-lg"
                    onClick={() => {
                      setTextarea(" ");
                      clearText();
                    }}
                  >
                    <img
                      src="./clear.svg"
                      alt="clear-all"
                      className=" w-[1.2rem] h-[1.2rem]"
                    />
                  </button>
                </Tooltip>

                <button
                  className="w-[35px] h-[35px] flex justify-center items-center 
                bg-[#73777B25] rounded-lg"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <img
                    src="./settings.svg"
                    alt="settings"
                    className=" w-[1.2rem] h-[1.2rem]"
                  />
                </button>
              </div>
            </div>
          </div>
        )}
        <Settings showSettings={showSettings} />
      </motion.div>
    </motion.div>
  );
}

export default memo(Menu);

const Settings = ({ showSettings }: { showSettings: Boolean }) => {
  return (
    <AnimatePresence>
      {showSettings && (
        <motion.div
          className=" w-[350px] h-fit bg-white rounded-2xl p-2 z-[1]"
          initial={{ opacity: 0, translateY: -50 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ translateY: -50, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <Slider />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
