"use client";

import { useRouter } from "next/navigation";
import { countryStore } from "@/core/store/country-store";
import { useEffect } from "react";

interface CountryBulletinBoardPageProps {
  params: {
    countryCode: string;
  };
}

/**
 * @Description Local의 국가별로의 Bulletin Board Main Page
 * @author 김영서
 **/
export default function LocalBulletinBoardPage({
  params,
}: CountryBulletinBoardPageProps) {
    const { country, setCountry } = countryStore();
    const { countryCode } = params;
    const router = useRouter()


  useEffect(() => {
    setCountry(countryCode)
    console.log("country", countryCode)
  }, [params])

  return (<>
  <div>Bulletin Board of  {country} </div>
  {/* Create 버튼 */}
   <button className="bg-blue-300 text-white border border-solid border-black rounded-md" onClick={() => router.push(`/bulletin-board/local/${country}/create`)}>글쓰기</button></>)
}
