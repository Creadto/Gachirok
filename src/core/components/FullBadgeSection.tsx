import { Badge, ProfileResponse } from "@/app/profile/_types/ProfileResponse";
import {
  ActiveActivityBadge,
  InactiveActivityBadge,
} from "./icons/badges/ActivityBadge";
import {
  ActiveAmityBadge,
  InactiveAmityBadge,
} from "./icons/badges/AmityBadge";
import {
  ActiveAngelBadge,
  InactiveAngelBadge,
} from "./icons/badges/AngelBadge";
import {
  ActiveAttendanceBadge,
  InactiveAttendanceBadge,
} from "./icons/badges/AttendanceBadge";
import {
  ActiveCultureBadge,
  InactiveCultureBadge,
} from "./icons/badges/CultureBadge";
import { ActiveFoodBadge, InactiveFoodBadge } from "./icons/badges/FoodBadge";
import {
  ActiveGeniusBadge,
  InactiveGeniusBadge,
} from "./icons/badges/GeniusBadge";
import { ActiveLeaderBadge, InactiveLeaderBadge } from "./icons/badges/LeaderBadge";
import {
  ActiveSelfDevelopmentBadge,
  InactiveSelfDevelopmentBadge,
} from "./icons/badges/SelfDevelopmentBadge";
import {
  ActiveTravelerBadge,
  InactiveTravelerBadge,
} from "./icons/badges/TravelerBadge";

interface FullBadgeSectionProps {
  profile: ProfileResponse;
}

export const FullBadgeSection = ({ profile }: FullBadgeSectionProps) => {
  //profile.badges에서 해당하는 항목이 있는지 확인
  const getBadgeInfo = (badges: Badge[], badgeName: string) => {
    const badge = badges.find((b) => b.badge === badgeName);
    return {
      isActive: !!badge, // badge가 존재하면 true, 없으면 false
      level: badge?.level || 0, // badge level, 기본값은 0
    };
  };

  return (
    <div className="absolute top-[100%] right-[-45%] w-[254px] bg-white border-2 rounded-[10px] p-[15px]">
      <span className="text-sm font-semibold">뱃지현황</span>
      <div className="flex gap-x-[20px] flex-wrap">
        {/* culture-문화예술왕 */}
        <div className="flex flex-col  mt-[10px]">
          <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-full flex items-center justify-center p-[10px] relative">
            {getBadgeInfo(profile.badges || [], "culture").isActive ? (
              <ActiveCultureBadge />
            ) : (
              <InactiveCultureBadge />
            )}
            <div className="bg-white absolute left-1/2 transform -translate-x-1/2 top-[48px] border rounded-[50px] py-[1px] px-[6px] mr-[17px] flex justify-center items-center">
              <span className="text-[10px]">
                lv.{getBadgeInfo(profile.badges || [], "culture").level}
              </span>
            </div>
          </div>
          <span className="mt-[10px] flex w-full items-center justify-center text-xs text-[#808080]">
            문화예술왕
          </span>
        </div>

        {/* activity-무한체력 */}
        <div className="flex flex-col  mt-[10px]">
          <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-full flex items-center justify-center p-[10px] relative">
            {getBadgeInfo(profile.badges || [], "activity").isActive ? (
              <ActiveActivityBadge />
            ) : (
              <InactiveActivityBadge />
            )}
            <div className="bg-white absolute left-1/2 transform -translate-x-1/2 top-[48px] border rounded-[50px] py-[1px] px-[6px] mr-[17px] flex justify-center items-center">
              <span className="text-[10px]">
                lv.{getBadgeInfo(profile.badges || [], "activity").level}
              </span>
            </div>
          </div>
          <span className="mt-[10px] flex w-full items-center justify-center text-xs text-[#808080]">
            무한체력
          </span>
        </div>

        {/* food-맛집에 진심 */}
        <div className="flex flex-col mt-[10px]">
          <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-full flex items-center justify-center p-[10px] relative">
            {getBadgeInfo(profile.badges || [], "food").isActive ? (
              <ActiveFoodBadge />
            ) : (
              <InactiveFoodBadge />
            )}
            <div className="bg-white absolute left-1/2 transform -translate-x-1/2 top-[48px] border rounded-[50px] py-[1px] px-[6px] mr-[17px] flex justify-center items-center">
              <span className="text-[10px]">
                lv.{getBadgeInfo(profile.badges || [], "food").level}
              </span>
            </div>
          </div>
          <span className="mt-[10px] flex w-full items-center justify-center text-xs text-[#808080]">
            맛집에 진심
          </span>
        </div>

        {/* angel-날개 없는 천사 */}
        <div className="flex flex-col mt-[10px]">
          <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-full flex items-center justify-center p-[10px] relative">
            {getBadgeInfo(profile.badges || [], "angel").isActive ? (
              <ActiveAngelBadge />
            ) : (
              <InactiveAngelBadge />
            )}
            <div className="bg-white absolute left-1/2 transform -translate-x-1/2 top-[48px] border rounded-[50px] py-[1px] px-[6px] mr-[17px] flex justify-center items-center">
              <span className="text-[10px]">
                lv.{getBadgeInfo(profile.badges || [], "angel").level}
              </span>
            </div>
          </div>
          <span className="mt-[10px] flex w-[60px] whitespace-nowrap items-center justify-center text-xs text-[#808080]">
            날개 없는 천사
          </span>
        </div>

        {/* amity-핵인싸 */}
        <div className="flex flex-col mt-[10px]">
          <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-full flex items-center justify-center p-[10px] relative">
            {getBadgeInfo(profile.badges || [], "amity").isActive ? (
              <ActiveAmityBadge />
            ) : (
              <InactiveAmityBadge />
            )}
            <div className="bg-white absolute left-1/2 transform -translate-x-1/2 top-[48px] border rounded-[50px] py-[1px] px-[6px] mr-[17px] flex justify-center items-center">
              <span className="text-[10px]">
                lv.{getBadgeInfo(profile.badges || [], "amity").level}
              </span>
            </div>
          </div>
          <span className="mt-[10px] flex w-full items-center justify-center text-xs text-[#808080]">
            핵인싸
          </span>
        </div>

        {/* traveler-트래블러 */}
        <div className="flex flex-col mt-[10px]">
          <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-full flex items-center justify-center p-[10px] relative">
            {getBadgeInfo(profile.badges || [], "traveler").isActive ? (
              <ActiveTravelerBadge />
            ) : (
              <InactiveTravelerBadge />
            )}
            <div className="bg-white absolute left-1/2 transform -translate-x-1/2 top-[48px] border rounded-[50px] py-[1px] px-[6px] mr-[17px] flex justify-center items-center">
              <span className="text-[10px]">
                lv.{getBadgeInfo(profile.badges || [], "traveler").level}
              </span>
            </div>
          </div>
          <span className="mt-[10px] flex w-full items-center justify-center text-xs text-[#808080]">
            트래블러
          </span>
        </div>

        {/* self_develop-무한발전러 */}
        <div className="flex flex-col mt-[10px]">
          <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-full flex items-center justify-center p-[10px] relative">
            {getBadgeInfo(profile.badges || [], "self_develop").isActive ? (
              <ActiveSelfDevelopmentBadge />
            ) : (
              <InactiveSelfDevelopmentBadge />
            )}
            <div className="bg-white absolute left-1/2 transform -translate-x-1/2 top-[48px] border rounded-[50px] py-[1px] px-[6px] mr-[17px] flex justify-center items-center">
              <span className="text-[10px]">
                lv.{getBadgeInfo(profile.badges || [], "self_develop").level}
              </span>
            </div>
          </div>
          <span className="mt-[10px] flex w-full items-center justify-center text-xs text-[#808080]">
            무한발전러
          </span>
        </div>

        {/* attendance-출석왕 */}
        <div className="flex flex-col mt-[10px]">
          <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-full flex items-center justify-center p-[10px] relative">
            {getBadgeInfo(profile.badges || [], "attendance").isActive ? (
              <ActiveAttendanceBadge />
            ) : (
              <InactiveAttendanceBadge />
            )}
            <div className="bg-white absolute left-1/2 transform -translate-x-1/2 top-[48px] border rounded-[50px] py-[1px] px-[6px] mr-[17px] flex justify-center items-center">
              <span className="text-[10px]">
                lv.{getBadgeInfo(profile.badges || [], "attendance").level}
              </span>
            </div>
          </div>
          <span className="mt-[10px] flex w-full items-center justify-center text-xs text-[#808080]">
            출석왕
          </span>
        </div>

        {/* genius-지식인 */}
        <div className="flex flex-col mt-[10px]">
          <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-full flex items-center justify-center p-[10px] relative">
            {getBadgeInfo(profile.badges || [], "genius").isActive ? (
              <ActiveGeniusBadge />
            ) : (
              <InactiveGeniusBadge />
            )}
            <div className="bg-white absolute left-1/2 transform -translate-x-1/2 top-[48px] border rounded-[50px] py-[1px] px-[6px] mr-[17px] flex justify-center items-center">
              <span className="text-[10px]">
                lv.{getBadgeInfo(profile.badges || [], "genius").level}
              </span>
            </div>
          </div>
          <span className="mt-[10px] flex w-full items-center justify-center text-xs text-[#808080]">
            지식인
          </span>
        </div>

        {/* leader-리더십충만 */}
        <div className="flex flex-col mt-[10px]">
          <div className="w-[60px] h-[60px] bg-[#f6f6f6] rounded-full flex items-center justify-center p-[10px] relative">
          {getBadgeInfo(profile.badges || [], "leader").isActive ? (
              <ActiveLeaderBadge />
            ) : (
              <InactiveLeaderBadge />
            )}
            <div className="bg-white absolute left-1/2 transform -translate-x-1/2 top-[48px] border rounded-[50px] py-[1px] px-[6px] mr-[17px] flex justify-center items-center">
              <span className="text-[10px]">lv.{getBadgeInfo(profile.badges || [], "leader").level}</span>
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
