import { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";

interface DropdownSelectorProps {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  options: string[]; // Pass in any array of options
  name: string; // Form field name for useForm
  errorMessage: string; // Custom error message
  placeholder: string; // Custom placeholder text
  label: string; // Custom label
  trigger: UseFormTrigger<any>;
  setValue: UseFormSetValue<any>
}

/**
 * @Description 여러개의 항목 중 한개를 선택하는 Dropdown Component(재사용 가능)
 * @author 김영서
 **/
const DropdownSelector = ({
  selectedValue,
  setSelectedValue,
  register,
  errors,
  options,
  name,
  errorMessage,
  placeholder,
  label,
  trigger,
  setValue
  
}: DropdownSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the dropdown open/close
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle when an option is clicked
  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    setValue(name, value)
    trigger(name);
  };


  
  return (
    <div className="relative block text-left w-full">
      <label className="block mb-2 text-xs">{label}</label>
      <input
        type="text"
        {...register(name, { required: true })}
        value={selectedValue}
        onClick={toggleDropdown}
        readOnly
        className="block w-full border bg-slate-300 text-black 
         rounded-md p-2 mb-4"
        placeholder={placeholder}
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="none">
            {options.map((option, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handleOptionClick(option)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {errors[name] && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default DropdownSelector;
