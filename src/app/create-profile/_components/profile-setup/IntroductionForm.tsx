import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface IntroductionFormProps {
  register: UseFormRegister<any>;
  label: string;
  name: string;
  required?: boolean;
  errors: FieldErrors;
  maxLength: number;
}

/**
 * @Description 프로필 신규 생성의 Introduction 생성
 * @author 김영서
 **/
const IntroductionForm: React.FC<IntroductionFormProps> = ({
  register,
  label,
  name,
  required,
  errors,
  maxLength,
}) => {
  const [currentLength, setCurrentLength] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentLength(e.target.value.length);
  };

  return (
    <label className="block mt-[40px] text-[13px] text-[#808080]">
      {label}
      <textarea
        {...register(name, { required, maxLength })} //maxLength로 최대길이 지정
        className="mt-[10px] block h-[100px] w-full border bg-[#F6F6F6] pl-[15px] pt-[15px] text-[14px] rounded-lg focus:ring focus:ring-opacity-50"
        placeholder="자기소개를 입력해주세요." 
        onChange={handleInputChange}
      />
      <div className="text-right text-sm text-gray-400">
        {currentLength}/{maxLength}
      </div>
      {errors[name] && (
        <span className="text-red-500">자기소개는 필수항목입니다.</span>
      )}
    </label>
  );
};

export default IntroductionForm;
