import { CheckColorIcon } from "@/core/components/icons/create-profile/CheckIcon";

interface FilterCostDropdownProps {
  cost: boolean | null;
  setCost: (value: boolean | null) => void;
}

export const FilterCostDropdown = ({
  cost,
  setCost,
}: FilterCostDropdownProps) => {
  return (
    <div className="absolute top-[40px] left-0 z-10 flex flex-col w-[120px] bg-white rounded-lg shadow-md">
      <div className="mx-[12px]">
        <button
          type="button"
          className="flex items-center cursor-pointer border-b border-[#eeeeee] w-full py-[12px] text-[13px]"
          onClick={() => setCost(cost == true ? null : true)}
        >
          <span className={`${cost === true ? "text-[#e62a2f]" : ""}`}>
            있음
          </span>
          <div className=" ml-auto">
            {cost === true ? <CheckColorIcon color="#e62a2f" /> : <></>}
          </div>
        </button>
        <button
          type="button"
          className="flex items-center cursor-pointer border-b border-[#eeeeee] w-full py-[12px] text-[13px]"
          onClick={() => setCost(cost == false ? null : false)}
        >
          <span className={`${cost === false ? "text-[#e62a2f]" : ""}`}>
            없음
          </span>
          <div className=" ml-auto">
            {cost === false ? <CheckColorIcon color="#e62a2f" /> : <></>}
          </div>
        </button>
      </div>
    </div>
  );
};
