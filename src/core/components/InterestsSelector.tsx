import Image from "next/image";
import { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import {
  interestsOptions,
  interestsOptions3,
  interestsOptions4,
} from "../types/InterestsAndExpertisesOptions";
import {
  InterestSelectIcon,
  InterestUnselectIcon,
} from "./icons/create-profile/InterestSelectIcon";

interface InterestsSelectorProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  setValue: UseFormSetValue<any>;
}

/**
 * @Description 여행지 관심분야를 선택할 수 있는 버튼 모음
 * @author 김영서
 **/
const InterestsSelector = ({
  register,
  errors,
  setValue,
}: InterestsSelectorProps) => {
  // 선택된 관심 분야를 관리하는 상태
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // 버튼 클릭 시 관심 분야 추가/제거
  const handleInterestClick = (value: string) => {
    setSelectedInterests((prev) => {
      const newSelectedInterests = prev.includes(value)
        ? prev.filter((interest) => interest !== value) // 이미 선택된 경우 제거
        : [...prev, value]; // 새로 선택된 경우 추가

      // react-hook-form의 상태를 배열로 업데이트
      setValue("interests", newSelectedInterests, {
        shouldValidate: true,
      });
      return newSelectedInterests;
    });
  };

  useEffect(() => {
    console.log("interests", selectedInterests);
  }, [selectedInterests]);

  const options = interestsOptions;

  return (
    <div className="relative block text-left w-full">
      <div className="flex flex-row flex-1">
        <div
          className="flex flex-col flex-1 w-full mt-[10px]"
          {...register("interests", { required: true })}
        >
          <div className="flex flex-wrap gap-x-[11px] w-full h-[296px] justify-between ">
            {options.map((option, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handleInterestClick(option.value)}
                className={`w-[280px] h-[92px] block border rounded-lg relative ${
                  selectedInterests.includes(option.value)
                    ? "border-[#E62A2F] border-2"
                    : "border-[#EEEEEE] "
                }`}
              >
                <div className="flex flex-row gap-x-[3px] ml-[15px] mt-[18px] items-center">
                  <Image
                    src={option.icon}
                    alt={option.value}
                    width={30}
                    height={30}
                    className="w-[16px] h-[16px] "
                  />
                  <span
                    className={`justify-start items-center text-center font-semibold text-[15px] ${
                      selectedInterests.includes(option.value)
                        ? "text-[#E62A2F] "
                        : "text-black "
                    } `}
                  >
                    {option.label}
                  </span>
                  <div className="absolute top-[15px] right-[15px]">
                    {selectedInterests.includes(option.value) ? (
                      <InterestSelectIcon />
                    ) : (
                      <InterestUnselectIcon />
                    )}
                  </div>
                </div>
                <p className=" mx-[15px] mb-[15px] mt-[8px] text-xs text-[#808080] text-start">
                  {option.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Error Message */}
      {errors.interests && (
        <p className="text-red-500">관심분야는 1개 이상 선택해야 합니다.</p>
      )}
    </div>
  );
};

export default InterestsSelector;
