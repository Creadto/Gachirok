import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import { useEffect, useState } from "react";
import "./RangeSlider.css";

interface RangeSliderProps {
  onRangeChange: (min: string, max: string) => void; // 새로운 prop 추가
}

/**
 * @Description 소모임의 나이대를 고르게 할 수 있는 Slider
 * @author 김영서
 **/
const RangeSlider = ({ onRangeChange }: RangeSliderProps) => {
  const agePoint = ["20", "25", "30", "35", "40", "45", "50"];
  const [minValueIndex, setMinValueIndex] = useState(0);
  const [maxValueIndex, setMaxValueIndex] = useState(agePoint.length - 1);
  const [minCaption, set_minCaption] = useState("");
  const [maxCaption, set_maxCaption] = useState("");

  useEffect(() => {
    onRangeChange(agePoint[minValueIndex], agePoint[maxValueIndex]);
  }, [minValueIndex, maxValueIndex]);

  return (
    <MultiRangeSlider
      labels={agePoint}
      min={0}
      max={6}
      minValue={0}
      maxValue={6}
      step={1}
      minCaption={minCaption}
      maxCaption={maxCaption}
      onInput={(e: ChangeResult) => {
        set_minCaption(agePoint[e.minValue]);
        set_maxCaption(agePoint[e.maxValue]);
        setMinValueIndex(e.minValue);
        setMaxValueIndex(e.maxValue);
      }}
    />
  );
};

export default RangeSlider;
