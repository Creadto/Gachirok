"use client";
import GachigaIcon from "@/core/components/icons/GachigaIconPost";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CreateMeetingsButton } from "./_components/CreateMeetingsButton";
import GachigaPost from "./_components/GachigaPost";
import MyGachigaPost from "./_components/MyGachigaPost";

import "react-datepicker/dist/react-datepicker.css";
import { FilterSection } from "./_components/FilterSection";

interface GachigaPageProps {
  params: {
    countryCode: string;
  };
}

/**
 * @Description CountryCode에 해당하는 나라의 소모임 메인 페이지
 * @author 김영서
 **/
const GachigaPage = ({ params }: GachigaPageProps) => {
  const { countryCode } = params;
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isMyyMeetingsSelected, setIsMyMeetingsSelected] = useState(false);

  const size = Number(searchParams.get("size")) || 10; // Default to 20 if not specified
  const [page, setPage] = useState(Number(searchParams.get("page")) || 0)

  return (
    <>
      <div className=" mt-[30px] h-full ml-[8.1%] mr-[8.1%]">
        <div className="flex flex-row gap-x-[10px] text-[22px] items-center">
          <div>
            <GachigaIcon />
          </div>
          <button onClick={() => setIsMyMeetingsSelected(false)}>
            <p
              className={`${
                isMyyMeetingsSelected ? "text-[#a3a3a3] font-bold" : "font-bold"
              }`}
            >
              전체모임
            </p>
          </button>
          <button onClick={() => setIsMyMeetingsSelected(true)}>
            <p
              className={` ${
                isMyyMeetingsSelected ? "font-bold" : "font-bold text-[#a3a3a3]"
              }`}
            >
              내 모임
            </p>
          </button>
          <div className=" ml-auto items-end">
            <CreateMeetingsButton
              onClick={() =>
                router.push(
                  `/bulletin-board/local/${countryCode}/create/meetings`
                )
              }
            />
          </div>
        </div>
        <div className="flex flex-row">
          <FilterSection countryCode={countryCode} page={page} size={size}/>
        </div>
        {isMyyMeetingsSelected ? (
          <MyGachigaPost />
        ) : (
          <GachigaPost countryCode={countryCode} page={page} size={size} setPage={setPage}/>
        )}
      </div>
    </>
  );
};

export default GachigaPage;
