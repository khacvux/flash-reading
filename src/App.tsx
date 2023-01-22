import { useEffect, useMemo, useRef, useState } from "react";
import Menu from "./components/Menu";
import { motion } from "framer-motion";
import { useTextStore } from "./store/textStore";

function App() {
  const text = useTextStore((state) => state.text);
  const constraintsRef = useRef(null);
  const [i, set_i] = useState<number>(0);
  const [currentText, setCurentText] = useState<string>();
  const splited = useMemo(() => text.split(" "), [text]);

  useEffect(() => {

    const timer = setInterval(() => {
      set_i(i + 1);
      console.log(i)
      setCurentText(splited[i]);
    }, 150);

    if (i > splited.length) {
      return clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [i, text]);

  useEffect(() => {
    console.log('update')
    set_i(0)
  }, [text])

  return (
    <motion.div
      className=" w-screen h-screen flex items-center justify-center relative"
      ref={constraintsRef}
    >
      <p className=" text-white font-bold text-4xl">{currentText}</p>
      <Menu constraintsRef={constraintsRef} />
    </motion.div>
  );
}

export default App;
