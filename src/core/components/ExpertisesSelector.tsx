import Image from "next/image";
import { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { expertisesOptions3, expertisesOptions4 } from "../types/InterestsAndExpertisesOptions";


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

  const options3 = expertisesOptions3;
  const options4 = expertisesOptions4;

  return (
    <div className="relative block text-left w-full">
      <div className="flex flex-row flex-1">
        <div className="flex flex-col flex-1 w-full pt-1"   {...register("expertises", { required: true })}>
          <div className="flex flex-row gap-x-2">
            {options3.map((option, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handleExpertiseClick(option.value)}
                className={`w-[33%] block border border-gray-300 rounded-md px-2 py-4 mb-4 text-xs ${
                  selectedExpertises.includes(option.value)
                    ? "bg-pink-500 text-white"
                    : ""
                }`}
              >
                <div className="flex flex-row">
                  <Image
                    src={option.icon}
                    alt={option.value}
                    width={30}
                    height={30}
                  />
                  <span className="flex-1 justify-center items-center text-center text-base mt-0.5">
                    {option.label}
                  </span>
                </div>
                <p className="text-sm text-slate-300 text-start mt-2">
                  {option.description}
                </p>
              </button>
            ))}
          </div>
          <div className="flex flex-row gap-x-2">
            {options4.map((option, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handleExpertiseClick(option.value)}
                className={`w-[25%] block border border-gray-300 rounded-md px-2 py-4 mb-4 text-xs ${
                  selectedExpertises.includes(option.value)
                    ? "bg-pink-500 text-white"
                    : ""
                }`}
              >
                <div className="flex flex-row">
                  <Image
                    src={option.icon}
                    alt={option.value}
                    width={30}
                    height={30}
                  />
                  <span className="flex-1 justify-center items-center text-center text-base mt-0.5">
                    {option.label}
                  </span>
                </div>
                <p className="text-sm text-slate-300 text-start mt-2">
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
