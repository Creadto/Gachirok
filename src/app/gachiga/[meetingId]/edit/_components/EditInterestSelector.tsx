import { InterestSelectIcon, InterestUnselectIcon } from "@/core/components/icons/create-profile/InterestSelectIcon";
import { interestsOptions } from "@/core/types/InterestsAndExpertisesOptions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";


interface EditInterestsSelectorProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  setValue: UseFormSetValue<any>;
  interests: string[] | undefined;
}

/**
 * @Description 여행지 관심분야를 기존 데이터를 바탕으로 수정할 수 있는 버튼 모음
 * @author 김영서
 **/
const EditInterestsSelector = ({
  register,
  errors,
  setValue,
  interests
}: EditInterestsSelectorProps) => {
  // 선택된 관심 분야를 관리하는 상태
  const [selectedInterests, setSelectedInterests] = useState<string[]>(interests || []);

  // 초기 관심사를 설정하고, setValue 호출
  useEffect(() => {
    if (interests) {
      setSelectedInterests(interests);
      setValue("interests", interests, { shouldValidate: true });
    }
  }, [interests, setValue]);
  
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
      {selectedInterests?.length === 0 && (
        <p className="text-red-500">관심분야는 1개 이상 선택해야 합니다.</p>
      )}
    </div>
  );
};

export default EditInterestsSelector;
