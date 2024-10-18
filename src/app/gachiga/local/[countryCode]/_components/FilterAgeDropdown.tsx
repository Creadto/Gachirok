import { RangeSliderCustom } from "@/app/bulletin-board/local/[countryCode]/create/meetings/_components/RangeSlider"

interface FilterAgeDropdownProps {
  onRangeChange: (min: string, max: string) => void; // 새로운 prop 추가
  startAge: string;
  endAge: string;
}
export const FilterAgeDropdown = ({onRangeChange, startAge, endAge}: FilterAgeDropdownProps) => {

  return(
    <div className="absolute top-[40px] left-0 z-10 flex flex-col w-[300px] bg-white rounded-lg shadow-md">
      <div className=" py-[12px] px-[12px] flex flex-col">
      <span className={`font-bold text-sm ${startAge === "20" && endAge === "60" ? "text-[black] " : "text-[#e62a2f]"}`}>
            {startAge === "20" && endAge === "60"
              ? "전체"
              : `${startAge}~${endAge}세`}
          </span>
      <RangeSliderCustom onRangeChange={onRangeChange} startAge={startAge} endAge={endAge} />
      </div>
    </div>
  )
}