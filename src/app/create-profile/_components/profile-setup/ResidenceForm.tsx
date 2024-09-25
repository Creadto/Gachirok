import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface ResidenceFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

const ResidenceForm: React.FC<ResidenceFormProps> = ({ register, errors }) => {
  return (
    <label className="block mb-4">
      <span className="text-gray-700">거주 국가:</span>
      <select {...register("residenceCountryCode", { required: true })}>
        <option value="">선택하세요</option>
        <option value="Korea">한국</option>
        <option value="USA">미국</option>
        <option value="Singapore">싱가포르</option>
      </select>
      {errors.residenceCountryCode && (
        <span className="text-red-500">거주 국가는 필수입니다.</span>
      )}
    </label>
  );
};

export default ResidenceForm;