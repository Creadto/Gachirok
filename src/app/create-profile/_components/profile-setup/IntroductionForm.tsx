import React from "react";
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
  return (
    <label className="block mb-4">
      <span className="text-gray-700">{label}</span>
      <textarea
        {...register(name, { required, maxLength })} //maxLength로 최대길이 지정
        className="mt-1 block h-32 w-full border bg-slate-100 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
      />
      <div className="text-right text-sm text-gray-400">
        0/{maxLength}
      </div>
      {errors[name] && (
        <span className="text-red-500">자기소개는 필수항목입니다.</span>
      )}
    </label>
  );
};

export default IntroductionForm;