"use client";
import GachigaIcon from "@/core/components/icons/GachigaIconPost";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const [isMyyMeetingsSelected, setIsMyMeetingsSelected] = useState(false);
  const [isOrderMeetingOpen, setIsOrderMeetingOpen] = useState(false);

  return (
    <>
      <div className=" mt-[30px] h-full ml-[8.1%] mr-[8.1%] ">
        <div className="flex flex-row gap-x-[10px] mt-3 text-[22px] items-center">
          <div>
            <GachigaIcon />
          </div>
          <button onClick={() => setIsMyMeetingsSelected(false)}>
            <p
              className={`${
                isMyyMeetingsSelected ? "text-slate-300" : "font-bold"
              }`}
            >
              전체모임
            </p>
          </button>
          <button onClick={() => setIsMyMeetingsSelected(true)}>
            <p
              className={` ${
                isMyyMeetingsSelected ? "font-bold" : "text-slate-300"
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
          <FilterSection countryCode={countryCode}/>
        </div>
        <div className="flex mt-5 text-xs gap-x-[5px]">
          {/* <div className=" flex flex-row items-center justify-center">
            <button
              onClick={() => handleFilterModal()}
              className="flex border border-[#eeeeee] rounded-[50px] bg-white  py-[9px] pl-[12px] pr-[8px] gap-x-[2px] "
            >
              <span className="text-[13px]">관심분야</span>
              <ArrowDownIcon />
            </button>
          </div> */}

          {/* 검색 필터 모달창  */}
          {/* {isFilterModalOpen && (
            <FilterModal onClose={onClose} countryCode={countryCode} />
          )} */}
        </div>
        {isMyyMeetingsSelected ? (
          <MyGachigaPost />
        ) : (
          <GachigaPost countryCode={countryCode} />
        )}
      </div>
    </>
  );
};

export default GachigaPage;
