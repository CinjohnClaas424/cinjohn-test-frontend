import React from "react";
import ReactSlider from "react-slider";
import { useAppLanguage } from "../../hooks/useAppLanguage";
import messages from "../../language/language";
import "./slider.css";

export default function Slider({
  setJobLength,
}: {
  setJobLength: (length: number) => void;
}) {
  const language = useAppLanguage();

  const viewMessages = messages[language].slider;
  return (
    <div className="w-full h-12 items-center">
      <div className="w-full flex items-center justify-between mb-3">
        <h3 className="font-bold">{viewMessages.title}</h3>
      </div>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="slider-thumb"
        max={5}
        min={1}
        onChange={(value) => {
          setJobLength(value);
        }}
        trackClassName="slider-track"
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      />
    </div>
  );
}
