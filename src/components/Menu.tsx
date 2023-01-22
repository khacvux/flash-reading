import { ChangeEvent, memo, useState } from "react";
import { motion } from "framer-motion";
import { useTextStore } from "../store/textStore";

function Menu({ constraintsRef }: any) {
  const [visible, setVisible] = useState<Boolean>();
  const setText = useTextStore((state) => state.setText);
  const [textarea, setTextarea] = useState<string>();
  const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextarea(event.target.value);
  };
  const handleSubmit = () => {
    setText(textarea);
  };
  return (
    <motion.div
      className="min-w-[70px] min-h-[70px] flex items-center justify-center absolute cursor-pointer top-5 right-5"
      drag
      dragConstraints={constraintsRef}
    >
      <motion.div
        className="w-[42px] h-[42px] bg-white rounded-2xl overflow-hidden p-2 flex flex-col"
        whileHover={{ width: "350px", height: "450px" }}
        whileTap={{ width: "350px", height: "450px" }}
        onHoverStart={() => setVisible(true)}
        onHoverEnd={() => setVisible(false)}
      >
        {!visible ? (
          <></>
        ) : (
          <div className="w-full h-full flex flex-col space-y-2">
            <div className=" w-full flex-1">
              <textarea
                className="resize-none outline-none bg-[#73777B20] w-full min-h-full rounded-lg px-[5px]"
                value={textarea}
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className="flex flex-row items-center justify-center space-x-2">
              <motion.div
                className="bg-black text-white py-[3px] rounded-xl font-semibold w-[4.5rem] flex items-center justify-center"
                whileHover={{ width: "5.5rem" }}
                onClick={handleSubmit}
              >
                Read
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default memo(Menu);
