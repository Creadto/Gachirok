import Image from "next/image";
import { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { expertisesOptions, expertisesOptions3, expertisesOptions4 } from "../types/InterestsAndExpertisesOptions";
import { InterestSelectIcon, InterestUnselectIcon } from "./icons/create-profile/InterestSelectIcon";


interface ExpertisesSelectorProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  setValue: UseFormSetValue<any>
}

/**
 * @Description 거주지 전문분야를 선택할 수 있는 버튼 모음
 * @author 김영서
 **/
const ExpertisesSelector = ({ register, errors, setValue }: ExpertisesSelectorProps) => {
  // 선택된 관심 분야를 관리하는 상태
  const [selectedExpertises, setSelectedExpertises] = useState<string[]>([]);

  // 버튼 클릭 시 관심 분야 추가/제거
  const handleExpertiseClick = (value: string) => {
    setSelectedExpertises((prev) => {
      const newSelectedExpertises = prev.includes(value)
        ? prev.filter((interest) => interest !== value) // 이미 선택된 경우 제거
        : [...prev, value]; // 새로 선택된 경우 추가

      // react-hook-form의 상태를 배열로 업데이트
      setValue("expertises", newSelectedExpertises, {
        shouldValidate: true
      });
      return newSelectedExpertises;
    });
  };

  useEffect(() => {
    console.log("expertises", selectedExpertises)
  }, [selectedExpertises])

  const options = expertisesOptions;

  return (
    <div className="relative block text-left w-full">
      <div className="flex flex-row flex-1">
        <div className="flex flex-col flex-1 w-full mt-[10px]"   {...register("expertises", { required: true })}>
        <div className="flex flex-wrap gap-x-[11px] w-full h-[296px] justify-between ">
            {options.map((option, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handleExpertiseClick(option.value)}
                className={`w-[280px] h-[92px] block border rounded-lg relative ${
                  selectedExpertises.includes(option.value)
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
                      selectedExpertises.includes(option.value)
                        ? "text-[#E62A2F] "
                        : "text-black "
                    } `}
                  >
                    {option.label}
                  </span>
                  <div className="absolute top-[15px] right-[15px]">
                    {selectedExpertises.includes(option.value) ? (
                      <InterestSelectIcon />
                    ) : (
                      <InterestUnselectIcon />
                    )}
                  </div>
                </div>
                <p className=" mx-[15px] mb-[15px] mt-[8px] text-xs text-[#808080] text-start break-words">
                  {option.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Error Message */}
      {errors.expertises && (
        <p className="text-red-500">전문분야는 1개 이상 선택해야 합니다.</p>
      )}
    </div>
  );
};

export default ExpertisesSelector;
