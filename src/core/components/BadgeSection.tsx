import { Badge, ProfileResponse } from "@/app/profile/_types/ProfileResponse";
import { useState } from "react";
import { FullBadgeSection } from "./FullBadgeSection";
import { BadgeType, BadgeTypeItem } from "../types/BadgeType";
import { ActiveActivityBadge } from "./icons/badges/ActivityBadge";
import { ActiveAmityBadge } from "./icons/badges/AmityBadge";
import { ActiveAngelBadge } from "./icons/badges/AngelBadge";
import { ActiveAttendanceBadge } from "./icons/badges/AttendanceBadge";
import { ActiveCultureBadge } from "./icons/badges/CultureBadge";
import { ActiveFoodBadge } from "./icons/badges/FoodBadge";
import { ActiveGeniusBadge } from "./icons/badges/GeniusBadge";
import { ActiveLeaderBadge } from "./icons/badges/LeaderBadge";
import { ActiveSelfDevelopmentBadge } from "./icons/badges/SelfDevelopmentBadge";
import { ActiveTravelerBadge } from "./icons/badges/TravelerBadge";

interface BadgeSectionProps {
  profile: ProfileResponse;
}

export const BadgeSection = ({ profile }: BadgeSectionProps) => {
  const [isFullBadgeSectionOpen, setIsFullBadgeSectionOpen] = useState(false);

  const getFiltedBadges = (badges: Badge[], badgeType: BadgeTypeItem[]) => {
    return badgeType.filter((type) => {
      // Check if there's a badge that matches the type's value
      const badgeExists = badges.some((b) => b.badge === type.value);
      return badgeExists;
    });
  };

  const filteredBadges = getFiltedBadges(profile.badges!, BadgeType);

  const renderBadge = (badgeValue: string) => {
    switch (badgeValue) {
      case "activity":
        return <ActiveActivityBadge />;
      case "amity":
        return <ActiveAmityBadge />;
      case "angel":
        return <ActiveAngelBadge />;
      case "attendance":
        return <ActiveAttendanceBadge />;
      case "culture":
        return <ActiveCultureBadge />;
      case "food":
        return <ActiveFoodBadge />;
      case "genius":
        return <ActiveGeniusBadge />;
      case "leader":
        return <ActiveLeaderBadge />;
      case "self_develop":
        return <ActiveSelfDevelopmentBadge />;
      case "traveler":
        return <ActiveTravelerBadge />;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className="absolute right-[15px] bottom-[15px] space-x-[-5px] flex"
        onMouseEnter={() => setIsFullBadgeSectionOpen(true)}
        onMouseLeave={() => setIsFullBadgeSectionOpen(false)}
      >
        {profile.badges?.length === 0 ? (
          <></>
        ) : (
          // <div className="text-xs border p-1 rounded-lg text-white">전체 배지 현황</div>
          filteredBadges.map((badge, index) => (
            <div
              className="w-[26px] h-[26px] bg-black rounded-full p-[5px] flex items-center justify-center border-2 border-[#58485c] box-border"
              key={index}
            >
              {renderBadge(badge.value)}
            </div>
          ))
        )}
      </div>
      {isFullBadgeSectionOpen && <FullBadgeSection profile={profile} />}
    </>
  );
};
