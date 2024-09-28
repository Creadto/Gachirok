 "use client";

import usePostProfileResponse from "@/core/hooks/usePostProfileResponse";
import { mapProfileResponse } from "@/core/mapper/profile-mapper";
import useProfileStore from "@/core/store/profile-store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useUserStore from "../../store/user-store";


/**
 * @Description 프로필 아이콘 컴포넌트(User없을 때는 로그인/회원가입, 있을 때는 사진+이름)
 * @author 김영서
 **/
const ProfileIcon = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUserStore();
  const { profile } = useProfileStore();
  

  //API로부터 받은 Response를 user store에 저장
const fetchProfileData = async() => {
  try{
    const accessToken = `Bearer ${session?.accessToken}`
    const result = await usePostProfileResponse(accessToken);
    const profileData = result.data;

    setUser({
      ...user,
      profile : mapProfileResponse(profileData, profile)
    })
  } catch(error) {
    console.error("Failed to catch profile data", error)
  } finally{
    setLoading(false);
  }}



  //새로고침되어 store가 initialize되어도 다시 API호출
  useEffect(() => {
    if(session && status === "authenticated"){
      fetchProfileData()
    }
  }, [session, status, profile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  

  return (
    <div>
      {/* User의 signedUpUser가 true일 때 */}
      {user?.signedUpUser === true || session?.signedUpUser === true ? (
        <button
          onClick={() => router.push("/profile")}
          className="flex items-center bg-black text-white rounded-full px-2 py-2 text-sm"
        >
          {user.profile?.profilePhotoUrl ? (
            <img
              src={user.profile?.profilePhotoUrl}
              alt="Profile Preview"
              className="object-cover w-8 h-8 border rounded-full"
            />
          ) : (
            <></>
          )}

          <span className="my-auto ml-2">{session?.user?.name}</span>
        </button>
      ) : (
        <Link href="/?modal=signin" as="/signin">
          <button className="bg-black text-white rounded-full px-4 py-2 text-sm">
            로그인/회원가입
          </button>
        </Link>
      )}
    </div>
  );
};

export default ProfileIcon;
