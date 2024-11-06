"use client";
import ProfileModal from "@/core/components/ProfileCreateModal";
import { countryStore } from "@/core/store/country-store";
import useUserStore from "@/core/store/user-store";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { ProfileResponse } from "../profile/_types/ProfileResponse";
import { useGetUserProfileResponse } from "@/core/hooks/useGetProfile";
import useProfileStore2 from "@/core/store/profile-v2-store";

interface PageProps {
  params: {
    countryCode: string;
  };
}

/**
 * @Description 국가별로의 Main Page
 * @author 김영서
 **/
export default function Page({ params }: PageProps) {
  const { countryCode } = params;
  const { country, setCountry, countryName } = countryStore();
  const { user } = useUserStore();
  const { data: session } = useSession();
  const { profile, setProfile } = useProfileStore2();

  //URL의 params을 country store에 저장
  useEffect(() => {
    setCountry(countryCode);
  }, []); //mount될 때 실행



  return (
    <>
      <div>Homepage of {countryName}</div>

      {/* 프로필이 존재하지 않으면 ProfileModal이 등장하도록 */}
      {(user?.signedUpUser || session?.signedUpUser) && !profile ? (
        <ProfileModal />
      ) : (
        <div></div>
      )}
    </>
  );
}
