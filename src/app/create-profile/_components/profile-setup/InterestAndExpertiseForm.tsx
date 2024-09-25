import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface InterestAndExpertiseFormProps {
  register: UseFormRegister<any>;
  label: string;
  name: string;
  options: string[];
  errors: FieldErrors;
}

const InterestAndExpertiseForm: React.FC<InterestAndExpertiseFormProps> = ({
  register,
  label,
  name,
  options,
  errors,
}) => {
  return (
    <label className="flex flex-col mb-4">
      <span className="text-gray-700 text-xs">{label}</span>
      {options.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <input
            {...register(name)}
            type="checkbox"
            value={option}
            className="form-checkbox"
          />
          <span>{option}</span>
        </div>
      ))}
      {errors[name] && (
        <span className="text-red-500">{`${label}는 필수입니다.`}</span>
      )}
    </label>
  );
};

export default InterestAndExpertiseForm;