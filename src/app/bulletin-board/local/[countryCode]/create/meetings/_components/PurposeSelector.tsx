import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface PurposeSelectorProps {
  selectedPurpose: string;
  setSelectedPurpose: (value: string) => void;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

/**
 * @Description Meetings의 목적을 선택하는 DropdownMenu
 * @author 김영서
 **/
const PurposeSelector = ({
  selectedPurpose,
  setSelectedPurpose,
  register,
  errors,
}: PurposeSelectorProps) => {
  const [isPurposeOpen, setIsPurposeOpen] = useState(false);
  const purposes = ["목적1", "목적2", "목적3"];

  //Dropdown의 열림여부 결정
  const togglePurposeDropdown = () => {
    setIsPurposeOpen((prev) => !prev);
  };

  //Dropdown의 Element을 선택하면 Dropdown닫히고, purpose의 값 업데이트
  const handlePurposeClick = (purpose: string) => {
    setSelectedPurpose(purpose);
    setIsPurposeOpen(false);
  };

  return (
    <div className="relative block text-left">
      <label className="block mb-2">모임 목적</label>
      <input
        type="text"
        {...register("purpose", { required: true })}
        value={selectedPurpose}
        onClick={togglePurposeDropdown}
        readOnly
        className="block w-full border bg-slate-300 text-black 
         rounded-md p-2 mb-4"
        placeholder="목적을 선택해 주세요."
      />

      {/* Purpose Dropdown */}
      {isPurposeOpen && (
        <div className="absolute right-0 z-10 mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="none">
            {purposes.map((purpose, index) => (
              <button
                key={index}
                onClick={() => handlePurposeClick(purpose)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                {purpose}
              </button>
            ))}
          </div>
        </div>
      )}
      {errors.purpose && <p className="text-red-500">목적은 필수항목입니다.</p>}
    </div>
  );
};

export default PurposeSelector;
