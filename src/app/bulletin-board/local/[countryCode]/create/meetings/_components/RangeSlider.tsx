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
export const RangeSlider = ({ onRangeChange }: RangeSliderProps) => {
  const agePoint = ["20", "25", "30", "35", "40", "45", "50", "55", "60"];
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
      max={8}
      minValue={0}
      maxValue={8}
      step={1}
      minCaption={minCaption}
      maxCaption={maxCaption}
      style={{boxShadow: 'none', border: 'none'}}
      onInput={(e: ChangeResult) => {
        set_minCaption(agePoint[e.minValue]);
        set_maxCaption(agePoint[e.maxValue]);
        setMinValueIndex(e.minValue);
        setMaxValueIndex(e.maxValue);
      }}
    />
  );
};

interface RangeSliderCustomProps {
  onRangeChange: (min: string, max: string) => void; // 새로운 prop 추가
  startAge: string;
  endAge: string
}

export const RangeSliderCustom = ({ onRangeChange, startAge, endAge }: RangeSliderCustomProps) => {
  const agePoint = ["20", "25", "30", "35", "40", "45", "50", "55", "60"];
  const [minValueIndex, setMinValueIndex] = useState(agePoint.indexOf(startAge)); // startAge로 초기화
  const [maxValueIndex, setMaxValueIndex] = useState(agePoint.indexOf(endAge)); // endAge로 초기화
  const [minCaption, set_minCaption] = useState(agePoint[agePoint.indexOf(startAge)]);
  const [maxCaption, set_maxCaption] = useState(agePoint[agePoint.indexOf(endAge)]);

  useEffect(() => {
    onRangeChange(agePoint[minValueIndex], agePoint[maxValueIndex]);
  }, [minValueIndex, maxValueIndex]);

  useEffect(() => {
    // 슬라이더가 처음 렌더링될 때 startAge와 endAge로 초기화
    setMinValueIndex(agePoint.indexOf(startAge));
    setMaxValueIndex(agePoint.indexOf(endAge));
    set_minCaption(agePoint[agePoint.indexOf(startAge)]);
    set_maxCaption(agePoint[agePoint.indexOf(endAge)]);
  }, [startAge, endAge]);

  return (
    <MultiRangeSlider
      labels={agePoint}
      min={0}
      max={8}
      minValue={minValueIndex}
      maxValue={maxValueIndex}
      step={1}
      minCaption={minCaption}
      maxCaption={maxCaption}
      style={{boxShadow: 'none', border: 'none'}}
      onInput={(e: ChangeResult) => {
        set_minCaption(agePoint[e.minValue]);
        set_maxCaption(agePoint[e.maxValue]);
        setMinValueIndex(e.minValue);
        setMaxValueIndex(e.maxValue);
      }}
    />
  );
};
