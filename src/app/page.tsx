"use client";
import ProfileModal from "@/core/components/ProfileCreateModal";
import useGetUserResponse from "@/core/hooks/useGetUserResponse";
import { mapUserResponse } from "@/core/mapper/user-mapper";
import useUserStore from "@/core/store/user-store";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { user, setUser } = useUserStore();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);


/**
 * @Description useGetUserResponse API 훅을 바탕으로 User store 업데이트 및 오류 처리
 * @author 김영서
 **/
  const fetchUserData = async() => {
    try{
      const accessToken =  `Bearer ${session?.accessToken}`
      const result = await useGetUserResponse(accessToken);
      const userData = result.data;

      setUser(mapUserResponse(userData))
    } catch(error){
      console.error("Failed to catch user data", error)
    } finally{
      setLoading(false)
    }
  }

//session과 status가 바뀔때마다 실행 
  useEffect(() => {
    if(session && status === "authenticated"){
      fetchUserData()
    }
  }, [session, status]);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center">
  //       <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
  //       <span className="ml-2">Loading...</span>
  //     </div>
  //   );
  // }

  return (
    <>
      <div>Homepage</div>
      {(user.signedUpUser === true || session?.signedUpUser === true) &&
      user.profile === null ? (
        <ProfileModal />
      ) : (
        redirect("/KR")
      )}
    </>
  );
}
