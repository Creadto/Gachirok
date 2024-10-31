import {
  InterestSelectIcon,
  InterestUnselectIcon,
} from "@/core/components/icons/create-profile/InterestSelectIcon";
import React from "react";

interface TwoButtonApprovalProps {
  options: { label: string; value: boolean; description: string }[]; // description 추가
  activeValue: boolean;
  onChange: (value: boolean) => void;
}

/**
 * @Description  프로필 신규 생성의 여행자/거주자 및 남자/여자 고르는 버튼
 * @author 김영서
 **/
const TwoButtonApproval: React.FC<TwoButtonApprovalProps> = ({
  options,
  activeValue,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">모집방식</label>
      <div className="flex space-x-4">
        {options.map((option) => (
          <button
            type="button"
            key={option.label}
            className={`w-1/2 border-2 rounded-lg p-4 text-left relative bg-white text-[#808080] ${
              activeValue === option.value
                ? "border-[#E62A2F]  "
                : "border-[#EEEEEE]  "
            }`}
            onClick={() => onChange(option.value)}
          >
            <div className="flex justify-between items-center">
              <span
                className={`font-semibold ${
                  activeValue === option.value
                    ? "text-[#E62A2F] "
                    : "text-[#A3A3A3] "
                }`}
              >
                {option.label}
              </span>
              <div className="absolute top-[15px] right-[15px]">
                {activeValue === option.value ? (
                  <InterestSelectIcon />
                ) : (
                  <InterestUnselectIcon />
                )}
              </div>
            </div>
            <p className="text-sm mt-2">
              {option.description.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TwoButtonApproval;
