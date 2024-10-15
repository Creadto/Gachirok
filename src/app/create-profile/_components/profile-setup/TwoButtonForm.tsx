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
    <div>
      <label className="block mt-[40px] text-[13px] text-[#808080]">
        {title}
      </label>
      <div className="flex space-x-[5px]">
        {options.map((option) => (
          <button
            type="button"
            key={option.label}
            className={`w-[100px] h-[50px] text-[14px] border border-[#EEEEEE] flex items-center justify-center rounded-lg ${
              activeValue === option.value
                ? "bg-[#E62A2F] text-white border-none"
                : "bg-white"
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
