"use client";

import usePostProfileResponse from "@/core/hooks/usePostProfileResponse";
import { mapProfileResponse } from "@/core/mapper/profile-mapper";
import useProfileStore from "@/core/store/profile-store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useUserStore from "../../store/user-store";
import { ProfileDropdown } from "./ProfileDropdown";
import { NoProfileIcon } from "../icons/NoProfileIcon";
import { useGetUserProfileResponse } from "@/core/hooks/useGetProfile";
import { useQuery } from "@tanstack/react-query";
import { ProfileResponse } from "@/app/profile/_types/ProfileResponse";
import useProfileStore2 from "@/core/store/profile-v2-store";
import { PersonalProfileModal } from "../PersonalProfileModal";

/**
 * @Description 프로필 아이콘 컴포넌트(User없을 때는 로그인/회원가입, 있을 때는 사진+이름)
 * @author 김영서
 **/
const ProfileIcon = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUserStore();
  // const { profile } = useProfileStore();
  const { profile, setProfile } = useProfileStore2();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);

  const {
    data: userProfileData,
    isLoading: isUserProfileDataLoading,
    isError: isUserError,
    error: userError,
  } = useQuery<ProfileResponse, Error>({
    queryKey: ["profile"],
    queryFn: () => useGetUserProfileResponse(session?.accessToken),
    enabled: !!session?.accessToken,
    retry: 2,
  });

  useEffect(() => {
    if (userProfileData) {
      setProfile(userProfileData);
    }
  }, [userProfileData]);

  if (userProfileData)
    return (
      <>
        {/* User의 signedUpUser가 true일 때 */}
        {user?.signedUpUser === true || session?.signedUpUser === true ? (
          <button
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="bg-black text-white rounded-[50px] h-[40px] relative flex items-center justify-center w-full box-border z-30"
          >
            <div className=" ml-[5px] mr-[12px] my-[5px] w-[104px] flex h-[30px] gap-x-[5px]">
              {userProfileData?.profilePhotoUrl ? (
                <img
                  src={userProfileData?.profilePhotoUrl}
                  alt="Profile Preview"
                  className="object-cover w-[30px] h-[30px] border-none rounded-full"
                />
              ) : (
                <div className="object-cover w-[30px] h-[30px] border-none rounded-full">
                  <NoProfileIcon />
                </div>
              )}
              <span className="block w-full text-[14px] whitespace-nowrap items-center justify-center my-auto">
                {userProfileData?.nickname}님
              </span>
            </div>
          </button>
        ) : (
          <div className="bg-black text-white rounded-[50px] h-[40px] flex items-center justify-center w-full box-border">
            <Link
              href="/?modal=signin"
              as="/signin"
              className="text-[14px] py-[10px] px-[12px]"
            >
              로그인/회원가입
            </Link>
          </div>
        )}

        {isProfileOpen && (
          <ProfileDropdown
            profile={userProfileData}
            closeModal={() => setIsProfileOpen(false)}
            session={session}
            setIsUserProfileModalOpen={setIsUserProfileModalOpen}
          />
        )}

        {/* UserProfileModal only depends on its own state */}
        {isUserProfileModalOpen && (
          <PersonalProfileModal
            session={session}
            setIsUserProfileModalOpen={setIsUserProfileModalOpen}
          />
        )}
      </>
    );
};

export default ProfileIcon;
