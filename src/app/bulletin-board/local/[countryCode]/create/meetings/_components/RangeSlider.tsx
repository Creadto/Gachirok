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
  const [minCaption, setMinCaption] = useState("");
  const [maxCaption, setMaxCaption] = useState("");

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
        setMinCaption(agePoint[e.minValue]);
        setMaxCaption(agePoint[e.maxValue]);
        setMinValueIndex(e.minValue);
        setMaxValueIndex(e.maxValue);
      }}
    />
  );
};

interface RangeSliderCustomProps {
  onRangeChange: (min: string, max: string) => void; // 새로운 prop 추가
  startAge: string | undefined;
  endAge: string | undefined
}

export const RangeSliderCustom = ({ onRangeChange, startAge, endAge }: RangeSliderCustomProps) => {
  const agePoint = ["20", "25", "30", "35", "40", "45", "50", "55", "60"];
  const [minValueIndex, setMinValueIndex] = useState(agePoint.indexOf(startAge ?? agePoint[0])); // startAge로 초기화
  const [maxValueIndex, setMaxValueIndex] = useState(agePoint.indexOf(endAge ?? agePoint[agePoint.length - 1])); // endAge로 초기화
  const [minCaption, setMinCaption] = useState(agePoint[minValueIndex]);
  const [maxCaption, setMaxCaption] = useState(agePoint[maxValueIndex]);

  useEffect(() => {
    onRangeChange(agePoint[minValueIndex], agePoint[maxValueIndex]);
  }, [minValueIndex, maxValueIndex]);

  useEffect(() => {
    // 슬라이더가 처음 렌더링될 때 startAge와 endAge로 초기화
    const newMinIndex = agePoint.indexOf(startAge ?? agePoint[0]);
    const newMaxIndex = agePoint.indexOf(endAge ?? agePoint[agePoint.length - 1]);

    setMinValueIndex(newMinIndex);
    setMaxValueIndex(newMaxIndex);
    setMinCaption(agePoint[newMinIndex]);
    setMaxCaption(agePoint[newMaxIndex]);
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
        setMinCaption(agePoint[e.minValue]);
        setMaxCaption(agePoint[e.maxValue]);
        setMinValueIndex(e.minValue);
        setMaxValueIndex(e.maxValue);
      }}
    />
  );
};
