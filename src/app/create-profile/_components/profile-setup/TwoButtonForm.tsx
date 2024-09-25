import React from "react";

interface TwoButtonFormProps {
  title: string;
  options: { label: string; value: boolean }[];
  activeValue: boolean;
  onChange: (value: boolean) => void;
}

const TwoButtonForm: React.FC<TwoButtonFormProps> = ({
  title,
  options,
  activeValue,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{title}</label>
      <div className="flex space-x-4">
        {options.map((option) => (
          <button
            key={option.label}
            className={`px-4 py-2 rounded ${
              activeValue === option.value ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TwoButtonForm;