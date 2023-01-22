import "../styles/slider.css";
import MUISlider, { SliderProps } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { useMainStore } from "../store/mainStore";

const CustomSlider = styled(MUISlider)<SliderProps>(({ theme }) => ({
  width: "100%",
  color: "#000",
  "& .MuiSlider-thumb": {
    with: "0px",
    height: "0px",
    color: "#000",
    "&.Mui-active, &.Mui-focusVisible, &:hover": {
      boxShadow: `0px 0px 0px 14px #00000000`,
    },
  },
}));

export default function Slider() {
  const mainStore = useMainStore();
  const handleChangeSliderValue = (e: any) => {
    mainStore.changeReadSpeed(e.target.value);
  };
  return (
    <div className="flex flex-row space-x-2 items-center justify-center">
      <div
        className="h-[80px] bg-[#CACBCC80] px-2 rounded-lg flex flex-col
                        justify-center items-center w-[150px] space-y-1"
      >
        <span className="text-[2rem] font-medium">{mainStore.wordsPerMin}</span>
        <p className="text-sm">words/min</p>
      </div>

      <CustomSlider
        defaultValue={120}
        min={1}
        max={800}
        sx={{
          width: "100%",
          height: "35px",
          color: "#73777B",
          border: 0,
          borderRadius: "0.5rem",
          overflow: "hidden",
        }}
        value={mainStore.wordsPerMin}
        onChange={(e) => handleChangeSliderValue(e)}
      />
    </div>
  );
}
