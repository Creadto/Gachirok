import CloseIcon from "@/core/components/icons/CloseIcon";
import { LocationIcon } from "@/core/components/icons/LocationIcon";

interface LocationSectionProps {
  setIsLocationModalOpen: (value: boolean) => void;
  location: string;
  setLocation: (value: string) => void;
  setLocationDetail: (value: string) => void;
}

export const LocationSection = ({setIsLocationModalOpen, location, setLocation, setLocationDetail}: LocationSectionProps) => {
  return (
    <>
      <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">
        위치 (선택)
      </label>
      <div className="flex relative">
        <div className="absolute left-[15px] top-[17px]">
          <LocationIcon />
        </div>
        <button
          type="button"
          className="block w-full border bg-[#F6F6F6] text-black text-[14px] text-start h-[50px] rounded-lg pl-[36px] px-[15px]"
          onClick={() => setIsLocationModalOpen(true)}
        >
          {location ? location : "위치를 설정해주세요."}
        </button>
        {location && (
          <button
            className="absolute right-[15px] top-[12px]"
            onClick={() => setLocation("")}
          >
            <CloseIcon />
          </button>
        )}
      </div>
      {/* 상세 주소 입력 */}

      {location && (
        <>
          <label className="block mt-[10px] text-xs text-[#808080] mb-[10px]">
            상세 주소 입력
          </label>
          <input
            type="text"
            className="block w-full border bg-[#F6F6F6] text-black text-[14px] text-start h-[50px] rounded-lg px-[15px]"
            placeholder="상세 주소를 입력해주세요."
            onChange={(e) => setLocationDetail(e.target.value)}
          />
        </>
      )}
    </>
  );
};
