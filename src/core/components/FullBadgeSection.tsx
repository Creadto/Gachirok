import { InactiveActivityBadge } from "./icons/badges/ActivityBadge";
import { InactiveAmityBadge } from "./icons/badges/AmityBadge";
import { InactiveAngelBadge } from "./icons/badges/AngelBadge";
import { InactiveAttendanceBadge } from "./icons/badges/AttendanceBadge";
import { InactiveCultureBadge } from "./icons/badges/CultureBadge";
import { InactiveFoodBadge } from "./icons/badges/FoodBadge";
import { InactiveGeniusBadge } from "./icons/badges/GeniusBadge";
import { InactiveLeaderBadge } from "./icons/badges/LeaderBadge";
import { InactiveSelfDevelopmentBadge } from "./icons/badges/SelfDevelopmentBadge";
import { InactiveTravelerBadge } from "./icons/badges/TravelerBadge";

export const FullBadgeSection = () => {
  return (
    <div className="absolute top-[100%] right-[-55%] w-[254px] bg-white border-2 rounded-[10px] p-[15px]">
      <span className="text-sm font-semibold">뱃지현황</span>
      <div className="flex gap-x-[20px] flex-wrap">
        {/* culture-문화예술왕 */}
        <div className="flex flex-col  mt-[10px]">
          <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-full flex items-center justify-center p-[10px] relative">
            <InactiveCultureBadge />
            <div className="bg-white absolute left-1/2 transform -translate-x-1/2 top-[48px] border rounded-[50px] py-[1px] px-[6px] mr-[17px] flex justify-center items-center">
              <span className="text-[10px]">lv.0</span>
            </div>
          </div>
          <span className="mt-[10px] flex w-full items-center justify-center text-xs text-[#808080]">
            문화예술왕
          </span>
        </div>

        {/* activity-무한체력 */}
        <div className="flex flex-col  mt-[10px]">
          <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-full flex items-center justify-center p-[10px] relative">
            <InactiveActivityBadge />
            <div className="bg-white absolute left-1/2 transform -translate-x-1/2 top-[48px] border rounded-[50px] py-[1px] px-[6px] mr-[17px] flex justify-center items-center">
              <span className="text-[10px]">lv.0</span>
            </div>
          </div>
          <span className="mt-[10px] flex w-full items-center justify-center text-xs text-[#808080]">
            무한체력
          </span>
        </div>

        {/* food-맛집에 진심 */}
        <div className="flex flex-col mt-[10px]">
          <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-full flex items-center justify-center p-[10px] relative">
            <InactiveFoodBadge />
            <div className="bg-white absolute left-1/2 transform -translate-x-1/2 top-[48px] border rounded-[50px] py-[1px] px-[6px] mr-[17px] flex justify-center items-center">
              <span className="text-[10px]">lv.0</span>
            </div>
          </div>
          <span className="mt-[10px] flex w-full items-center justify-center text-xs text-[#808080]">
            맛집에 진심
          </span>
        </div>

        {/* angel-날개 없는 천사 */}
        <div className="flex flex-col mt-[10px]">
          <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-full flex items-center justify-center p-[10px] relative">
            <InactiveAngelBadge />
            <div className="bg-white absolute left-1/2 transform -translate-x-1/2 top-[48px] border rounded-[50px] py-[1px] px-[6px] mr-[17px] flex justify-center items-center">
              <span className="text-[10px]">lv.0</span>
            </div>
          </div>
          <span className="mt-[10px] flex w-[60px] whitespace-nowrap items-center justify-center text-xs text-[#808080]">
            날개 없는 천사
          </span>
        </div>

        {/* amity-핵인싸 */}
        <div className="flex flex-col mt-[10px]">
          <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-full flex items-center justify-center p-[10px] relative">
            <InactiveAmityBadge />
            <div className="bg-white absolute left-1/2 transform -translate-x-1/2 top-[48px] border rounded-[50px] py-[1px] px-[6px] mr-[17px] flex justify-center items-center">
              <span className="text-[10px]">lv.0</span>
            </div>
          </div>
          <span className="mt-[10px] flex w-full items-center justify-center text-xs text-[#808080]">
            핵인싸
          </span>
        </div>

        {/* traveler-트래블러 */}
        <div className="flex flex-col mt-[10px]">
          <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-full flex items-center justify-center p-[10px] relative">
            <InactiveTravelerBadge />
            <div className="bg-white absolute left-1/2 transform -translate-x-1/2 top-[48px] border rounded-[50px] py-[1px] px-[6px] mr-[17px] flex justify-center items-center">
              <span className="text-[10px]">lv.0</span>
            </div>
          </div>
          <span className="mt-[10px] flex w-full items-center justify-center text-xs text-[#808080]">
            트래블러
          </span>
        </div>

        {/* self_development-무한발전러 */}
        <div className="flex flex-col mt-[10px]">
          <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-full flex items-center justify-center p-[10px] relative">
            <InactiveSelfDevelopmentBadge />
            <div className="bg-white absolute left-1/2 transform -translate-x-1/2 top-[48px] border rounded-[50px] py-[1px] px-[6px] mr-[17px] flex justify-center items-center">
              <span className="text-[10px]">lv.0</span>
            </div>
          </div>
          <span className="mt-[10px] flex w-full items-center justify-center text-xs text-[#808080]">
            무한발전러
          </span>
        </div>

        {/* attendance-출석왕 */}
        <div className="flex flex-col mt-[10px]">
          <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-full flex items-center justify-center p-[10px] relative">
            <InactiveAttendanceBadge />
            <div className="bg-white absolute left-1/2 transform -translate-x-1/2 top-[48px] border rounded-[50px] py-[1px] px-[6px] mr-[17px] flex justify-center items-center">
              <span className="text-[10px]">lv.0</span>
            </div>
          </div>
          <span className="mt-[10px] flex w-full items-center justify-center text-xs text-[#808080]">
            출석왕
          </span>
        </div>

        {/* genius-지식인 */}
        <div className="flex flex-col mt-[10px]">
          <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-full flex items-center justify-center p-[10px] relative">
            <InactiveGeniusBadge />
            <div className="bg-white absolute left-1/2 transform -translate-x-1/2 top-[48px] border rounded-[50px] py-[1px] px-[6px] mr-[17px] flex justify-center items-center">
              <span className="text-[10px]">lv.0</span>
            </div>
          </div>
          <span className="mt-[10px] flex w-full items-center justify-center text-xs text-[#808080]">
            지식인
          </span>
        </div>

{/* leader-리더십충만 */}
        <div className="flex flex-col mt-[10px]">
          <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-full flex items-center justify-center p-[10px] relative">
            <InactiveLeaderBadge />
            <div className="bg-white absolute left-1/2 transform -translate-x-1/2 top-[48px] border rounded-[50px] py-[1px] px-[6px] mr-[17px] flex justify-center items-center">
              <span className="text-[10px]">lv.0</span>
            </div>
          </div>
          <span className="mt-[10px] flex w-full items-center justify-center text-xs text-[#808080]">
            출석왕
          </span>
        </div>
      </div>
    </div>
  );
};
