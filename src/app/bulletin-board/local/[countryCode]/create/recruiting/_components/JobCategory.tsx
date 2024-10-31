import { JobGroupList } from "@/core/data/JobCategoryList";
import { useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface JobCategoryProps {
  register: UseFormRegister<any>;
  selectedJobCategory: string;
  setSelectedJobCategory: (jobCategory: string) => void;
  setSelectedJobSpecification: (jobSpecification: string[]) => void;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors;
}

export const JobCategory = ({
  register,
  selectedJobCategory,
  setSelectedJobCategory,
  setSelectedJobSpecification,
  setValue,
  errors,
}: JobCategoryProps) => {
  const jobGroupOptions = JobGroupList;
  const [isJobSelectOpen, setIsJobSelectOpen] = useState(false);
  return (
    <div className="relative block text-left w-full">
      <label className="block mb-[10px] text-xs text-[#808080]">
        직군/직무
      </label>
      <input
        type="text"
        {...register("jobCategory", { required: true })}
        value={
          jobGroupOptions.find(
            (jobGroup) => jobGroup.jobGroup === selectedJobCategory
          )?.name
        }
        onClick={() => {
          setIsJobSelectOpen((prev) => !prev);
          setSelectedJobSpecification([]);
        }}
        readOnly
        className="block w-full border bg-[#F6F6F6] text-black text-[14px] h-[50px]
 rounded-lg p-[15px]"
        placeholder="직군/직무를 선택해주세요."
      />

      {/* Dropdown Menu */}
      {isJobSelectOpen && (
        <div className="absolute right-0 z-10 mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="none">
            {jobGroupOptions.map((jobGroupItem) => (
              <button
                type="button"
                key={jobGroupItem.id}
                onClick={() => {
                  setSelectedJobCategory(jobGroupItem.jobGroup);
                  setIsJobSelectOpen(false);
                  setValue("jobCategory", jobGroupItem.jobGroup);
                }}
                className="block p-[15px] text-[13px] text-black hover:bg-gray-100 w-full text-left shadow-sm"
              >
                {jobGroupItem.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {errors["jobCategory"] && (
        <p className="text-red-500">직군/직무 선택은 필수입니다.</p>
      )}
    </div>
  );
};
