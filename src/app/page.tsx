"use client";
import ProfileModal from "@/core/components/ProfileCreateModal";
import { useGetUserProfileResponse } from "@/core/hooks/useGetProfile";
import useGetUserResponse from "@/core/hooks/useGetUserResponse";
import { mapUserResponse } from "@/core/mapper/user-mapper";
import useProfileStore2 from "@/core/store/profile-v2-store";
import useUserStore from "@/core/store/user-store";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import { ProfileResponse } from "./profile/_types/ProfileResponse";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { user, setUser } = useUserStore();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const { profile, setProfile } = useProfileStore2();

  /**
   * @Description useGetUserResponse API 훅을 바탕으로 User store 업데이트 및 오류 처리
   * @author 김영서
   **/
  const fetchUserData = async () => {
    try {
      const accessToken = `Bearer ${session?.accessToken}`;
      const result = await useGetUserResponse(accessToken);
      const userData = result.data;

      setUser(mapUserResponse(userData));
    } catch (error) {
      console.error("Failed to catch user data", error);
    } finally {
      setLoading(false);
    }
  };

  //session과 status가 바뀔때마다 실행
  useEffect(() => {
    if (session && status === "authenticated") {
      fetchUserData();
    }
    console.log(profile);
  }, [session, status, profile]);

  return (
    <>
      <div>Homepage</div>
      {(user?.signedUpUser || session?.signedUpUser) && !profile ? (
  <ProfileModal />
) : (
  redirect("/KR")
)}
    </>
  );
}
