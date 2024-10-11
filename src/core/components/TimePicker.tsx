import React, { useState } from "react";

interface TimePickerProps {
  label?: string;
  onTimeChange?: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ label = "시간", onTimeChange }) => {
  const [hours, setHours] = useState<string>("00");
  const [minutes, setMinutes] = useState<string>("00");

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setHours(value);
    if (onTimeChange) onTimeChange(`${value}:${minutes}`);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setMinutes(value);
    if (onTimeChange) onTimeChange(`${hours}:${value}`);
  };

  const generateTimeOptions = (range: number) => {
    return Array.from({ length: range }, (_, index) => (
      <option key={index} value={index < 10 ? `0${index}` : index}>
        {index < 10 ? `0${index}` : index}
      </option>
    ));
  };

  return (
    <div className="flex flex-col">
      {/* {label && <label className="font-semibold mb-2">{label}</label>} */}
      <div className="flex flex-row space-x-2 items-center">
        <select
          value={hours}
          onChange={handleHourChange}
          className="border border-gray-300 rounded-lg p-2 text-center bg-white"
        >
          {generateTimeOptions(24)}
        </select>
        <span>:</span>
        <select
          value={minutes}
          onChange={handleMinuteChange}
          className="border border-gray-300 rounded-lg p-2 text-center bg-white"
        >
          {generateTimeOptions(60)}
        </select>
      </div>
    </div>
  );
};

export default TimePicker;