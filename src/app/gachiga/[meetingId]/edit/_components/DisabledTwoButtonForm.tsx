import React from "react";

interface DisabledTwoButtonFormProps {
  title: string;
  options: { label: string; value: boolean }[];
  activeValue: boolean;
}

/**
 * @Description  프로필 신규 생성의 여행자/거주자 및 남자/여자 고르는 버튼
 * @author 김영서
 **/
const DisabledTwoButtonForm: React.FC<DisabledTwoButtonFormProps> = ({
  title,
  options,
  activeValue,
}) => {
  return (
    <div>
      <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
        {title}
      </label>
      <div className="flex space-x-[5px] mt-[10px]">
        {options.map((option) => (
          <div
            key={option.label}
            className={`w-[100px] h-[50px] text-[14px] border border-[#EEEEEE] flex items-center justify-center rounded-lg ${
              activeValue === option.value
                ? "bg-[#E62A2F] text-white border-none"
                : "bg-white"
            }`}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisabledTwoButtonForm;
