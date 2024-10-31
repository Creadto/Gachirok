import { CheckColorIcon } from "@/core/components/icons/create-profile/CheckIcon";
import { sexTypes } from "@/core/types/DataForUI";

interface FilterSexTypesDropdownProps {
  sexType: string | null;
  setSexType: (value: string | null) => void;
}

export const FilterSexTypesDropdown = ({
  sexType,
  setSexType,
}: FilterSexTypesDropdownProps) => {
  return (
    <div className="absolute top-[40px] left-0 z-10 flex flex-col w-[120px] bg-white rounded-lg shadow-md">
      <div className="mx-[12px]">
        {sexTypes.map((type) => (
          <button
            type="button"
            key={type.value}
            className="flex items-center cursor-pointer border-b border-[#eeeeee] w-full py-[12px] text-[13px]"
            onClick={() =>
              setSexType(sexType === type.value ? null : type.value)
            }
          >
            <span
              className={`${sexType === type.value ? "text-[#e62a2f]" : ""}`}
            >
              {type.label}
            </span>
            <div className="ml-auto">
              {sexType === type.value ? (
                <CheckColorIcon color="#e62a2f" />
              ) : (
                <></>
              )}
            </div>
          </button>
        ))}

      </div>
    </div>
  );
};
