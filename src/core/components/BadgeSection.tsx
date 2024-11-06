import { ProfileResponse } from "@/app/profile/_types/ProfileResponse";
import { ActiveActivityBadge } from "./icons/badges/ActivityBadge";
import { useState } from "react";
import { FullBadgeSection } from "./FullBadgeSection";

interface BadgeSectionProps {
  profile: ProfileResponse;
}

export const BadgeSection = ({ profile }: BadgeSectionProps) => {
  const [isFullBadgeSectionOpen, setIsFullBadgeSectionOpen] = useState(false);
  return (
    <>
      <div
        className="absolute right-[15px] bottom-[15px] space-x-[-5px] flex"
        onMouseEnter={() => setIsFullBadgeSectionOpen(true)}
        onMouseLeave={() => setIsFullBadgeSectionOpen(false)}
      >
        <div className="w-[26px] h-[26px] bg-black rounded-full p-[5px] flex items-center justify-center border-2 border-[#58485c] box-border">
          <ActiveActivityBadge />
        </div>
        <div className="w-[26px] h-[26px] bg-black rounded-full p-[5px] flex items-center justify-center border-2 border-[#58485c] box-border">
          <ActiveActivityBadge />
        </div>
        <div className="w-[26px] h-[26px] bg-black rounded-full p-[5px] flex items-center justify-center border-2 border-[#58485c] box-border">
          <ActiveActivityBadge />
        </div>
      </div>
      {isFullBadgeSectionOpen && <FullBadgeSection />}
    </>
  );
};
