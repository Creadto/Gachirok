import Image from "next/image";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue
} from "react-hook-form";
import {
  interestsOptions3,
  interestsOptions4
} from "../../../../core/types/InterestsAndExpertisesOptions";

interface ExpertisesSelectorFromDataProps {
  errors: FieldErrors;
  setValue: UseFormSetValue<any>;
  selectedExpertises: string[]; // 선택된 관심 분야 추가
  setSelectedExpertises: React.Dispatch<React.SetStateAction<string[]>>;
  register: UseFormRegister<any>;
}

/**
 * @Description Profile데이터를 바탕으로 출력하고, 여행지 관심분야를 선택할 수 있는 버튼
 * @author 김영서
 **/
const ExpertisesSelectorFromData = ({
  register,
  errors,
  setValue,
  selectedExpertises,
  setSelectedExpertises,
}: ExpertisesSelectorFromDataProps) => {

  // 버튼 클릭 시 관심 분야 추가/제거
  const handleExpertisesClick = (value: string) => {
    setSelectedExpertises((prev) => {
      const newSelectedExpertises = prev.includes(value)
        ? prev.filter((expertise) => expertise !== value) // 이미 선택된 경우 제거
        : [...prev, value]; // 새로 선택된 경우 추가

      //useForm의 상태 업데이트
      setValue("expertises", newSelectedExpertises);
      return newSelectedExpertises;
    });
  };


  const options3 = interestsOptions3;
  const options4 = interestsOptions4;

  return (
    <div className="relative block text-left w-full">
      <div className="flex flex-row flex-1">
        <div
          className="flex flex-col flex-1 w-full pt-1"
          {...register("interests", { required: true })}
        >
          <div className="flex flex-row gap-x-2">
            {options3.map((option, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handleExpertisesClick(option.value)}
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
                onClick={() => handleExpertisesClick(option.value)}
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
        <p className="text-red-500">전문 분야는 1개 이상 선택해야 합니다.</p>
      )}
    </div>
  );
};

export default ExpertisesSelectorFromData;
