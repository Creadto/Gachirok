import { CheckColorIcon } from "@/core/components/icons/create-profile/CheckIcon";

interface FilterApprovalDropdownProps {
  approval: boolean | null;
  setApproval: (value: boolean | null) => void;
}

export const FilterApprovalDropdown = ({
approval, setApproval
}: FilterApprovalDropdownProps) => {
  return (
    <div className="absolute top-[40px] left-0 z-10 flex flex-col w-[120px] bg-white rounded-lg shadow-md">
      <div className="mx-[12px]">

        <button
          type="button"
          className="flex items-center cursor-pointer border-b border-[#eeeeee] w-full py-[12px] text-[13px]"
          onClick={() => setApproval(approval == false ? null : false)}
        >
          <span className={`${approval === false ? "text-[#e62a2f]" : ""}`}>
            선착순
          </span>
          <div className=" ml-auto">
            {approval === false ? <CheckColorIcon color="#e62a2f" /> : <></>}
          </div>
        </button>
        <button
          type="button"
          className="flex items-center cursor-pointer border-b border-[#eeeeee] w-full py-[12px] text-[13px]"
          onClick={() => setApproval(approval == true ? null : true)}
        >
          <span className={`${approval === true ? "text-[#e62a2f]" : ""}`}>
            승인제
          </span>
          <div className=" ml-auto">
            {approval === true ? <CheckColorIcon color="#e62a2f" /> : <></>}
          </div>
        </button>
      </div>
    </div>
  );
};
