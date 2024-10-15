"use client";
import useGetProfileResponse from "@/core/hooks/useGetProfileResponse";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

//Client SIde Rendering
const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async () => {
    if (session?.accessToken) {
      try {
        const response = await useGetProfileResponse(session.accessToken);
        const data = response.data;
        if (data) {
          setLoading(false);
        }
        setProfileData(data);

      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [session]);


  const handleClick = () => {
    router.push("/profile/update"); // 버튼 클릭 시 리디렉션
  };

  //로그아웃 담당
  const SignOut = () => {
    return (
      session?.user && (
        <button
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600"
          onClick={() => signOut({
            callbackUrl: '/' //로그아웃 시 callbackurl을 통해 홈페이지로 자동 이동
          })}
        >
          <b>로그아웃</b>
        </button>
      )
    );
  }; 

  return (
    <div>
      {session?.accessToken ? (
        <div className="max-w-3xl p-6 mx-auto mt-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-4 text-2xl font-semibold text-center">Profile</h1>
          {loading === false ? (
            <div className="space-y-4">
              <p>
                <strong>Nickname:</strong> {profileData?.nickname}
              </p>
              <p>
                <strong>Introduction:</strong> {profileData?.introduction}
              </p>
              <img
                src={profileData?.profilePhotoUrl}
                alt="Profile Preview"
                className="object-cover w-32 h-32 border rounded-full"
              />
              <button
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600"
                onClick={handleClick}
              >
                내 정보 수정하기
              </button>
            </div>
          ) : (
            <div>Loading</div>
          )}
          <hr className="h-3" />
          <SignOut />
        </div>
      ) : (
        <button className="w-full px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600" onClick={() => router.push('/')}>Sign in Button</button>
      )}
    </div>
  );
};

export default ProfilePage;
