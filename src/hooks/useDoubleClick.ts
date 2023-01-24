import { MutableRefObject, RefObject, useEffect, useState } from "react";

export interface IDoubleClickHook<T = unknown> {
  ref: RefObject<T> | MutableRefObject<T>;
  latency: number;
  onSingleClick?: ((e: MouseEvent) => void) | undefined;
  onDoubleClick?: ((e: MouseEvent) => void) | undefined;
}

const useDoubleClick = ({
  ref,
  latency = 300,
  onSingleClick = () => null,
  onDoubleClick = () => null,
}: IDoubleClickHook) => {
  const [clickCount, setClickCount] = useState<number>(0);
  useEffect(() => {
    const clickRef: any = ref.current;
    console.log("rerun");
    const handleClick = (e: MouseEvent) => {
      setClickCount(clickCount + 1);

      setTimeout(() => {
        if (clickCount == 1) {
          onSingleClick(e);
          console.log("single");
        } else if (clickCount == 2) {
          onDoubleClick(e);
          console.log("double");
        }
        console.log(clickCount);
        setClickCount(0);
      }, latency);
    };

    clickRef.addEventListener("click", handleClick);

    return () => {
      clickRef.removeEventListener("click", handleClick);
    };
  });
};

export default useDoubleClick;
