import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface NicknameFormProps {
  register: UseFormRegister<any>;
  label: string;
  name: string;
  required?: boolean;
  errors: FieldErrors;
  placeholder: string;
}


/**
 * @Description 프로필 신규 생성의 Nickname 생성
 * @author 김영서
 **/
const NicknameForm: React.FC<NicknameFormProps> = ({
  register,
  label,
  name,
  required,
  errors,
  placeholder,
}) => {
  return (
    <label className="block mb-4">
      <span className="text-gray-700">{label}</span>
      <input
        type="text"
        {...register(name, { required })}
        placeholder={placeholder}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
      />
      {errors[name] && <span className="text-red-500">닉네임은 필수항목입니다.</span>}
    </label>
  );
};

export default NicknameForm;