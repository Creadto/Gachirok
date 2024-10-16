import { JobCategoryList } from "@/core/data/JobCategoryList";

interface  JobSpecificationProps{
  selectedJobCategory: string;
  handleJobSpecificationClick : (specification: string) => void;
  selectedJobSpecification: string[]

}
export const JobSpecification = ({selectedJobCategory, handleJobSpecificationClick, selectedJobSpecification}: JobSpecificationProps) => {
  const jobCategoryOptions = JobCategoryList;
  return(
    selectedJobCategory ? (
      <div className="w-full flex flex-wrap mt-[20px] gap-x-[5px]">
        {jobCategoryOptions
          .filter(
            (jobCategory) => jobCategory.jobGroup === selectedJobCategory
          )
          .map((jobCategory) => (
            <button
              type="button"
              key={jobCategory.id}
              value={jobCategory.jobSpecification}
              onClick={() =>
                handleJobSpecificationClick(jobCategory.jobSpecification)
              }
              className={`px-[12px] py-[9px] border border-[#eeeeee] rounded-[50px] mb-[5px] text-[13px]
            ${
              selectedJobSpecification.includes(jobCategory.jobSpecification)
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
            >
              {jobCategory.name}
            </button>
          ))}
      </div>
    ) : (
      <></>
    )
  )
}