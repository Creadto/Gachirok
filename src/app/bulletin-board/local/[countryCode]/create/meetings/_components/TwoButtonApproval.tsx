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
      <label className="block text-gray-700 mb-2">모집방식</label>
      <div className="flex space-x-4">
        {options.map((option) => (
          <button
            type="button"
            key={option.label}
            className={`w-1/2 border-2 rounded-lg p-4 text-left transition-colors duration-300 ${
              activeValue === option.value
                ? "border-pink-500 text-pink-500 bg-pink-50"
                : "border-gray-300 text-gray-500 bg-white"
            }`}
            onClick={() => onChange(option.value)}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{option.label}</span>
              {activeValue === option.value && (
                <span className="text-pink-500 font-bold">&#10003;</span>
              )}
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