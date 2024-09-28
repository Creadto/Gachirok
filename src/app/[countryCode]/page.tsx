"use client"
import ProfileModal from "@/core/components/ProfileCreateModal";
import { countryStore } from "@/core/store/country-store";
import useUserStore from "@/core/store/user-store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PageProps {
  params: {
    countryCode: string;
  }
}

/**
 * @Description 국가별로의 Main Page
 * @author 김영서
 **/
export default function Page({params}: PageProps) {
  const { countryCode } = params;
  const {country, setCountry, countryName} = countryStore();
  const {user} = useUserStore();
  const {data: session} = useSession();

  //URL의 params을 country store에 저장
  useEffect(() => {
    setCountry(countryCode)
    console.log("country in store", country)
  }, []) //mount될 때 실행

  return(<>
    <div>Homepage of {countryName}</div>

    {/* 프로필이 존재하지 않으면 ProfileModal이 등장하도록 */}
    {(user.signedUpUser === true || session?.signedUpUser === true) && user.profile === null ?     <ProfileModal /> : <div></div> }

  </>)

}
