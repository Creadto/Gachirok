import React from "react";

interface TwoButtonFormProps {
  title: string;
  options: { label: string; value: boolean }[];
  activeValue: boolean;
  onChange: (value: boolean) => void;
}

/**
 * @Description  프로필 신규 생성의 여행자/거주자 및 남자/여자 고르는 버튼
 * @author 김영서
 **/
const TwoButtonForm: React.FC<TwoButtonFormProps> = ({
  title,
  options,
  activeValue,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2 text-xs">{title}</label>
      <div className="flex space-x-4">
        {options.map((option) => (
          <button
          type="button"
            key={option.label}
            className={`px-4 py-2 rounded ${
              activeValue === option.value ? "bg-pink-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TwoButtonForm;