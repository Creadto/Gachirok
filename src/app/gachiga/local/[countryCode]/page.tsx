"use client";
import ArrowDownIcon from "@/core/components/icons/ArrowDownIcon";
import ArrowUpIcon from "@/core/components/icons/ArrowUpIcon";
import GachigaIcon from "@/core/components/icons/GachigaIconPost";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreateMeetingsButton } from "./_components/CreateMeetingsButton";
import GachigaPost from "./_components/GachigaPost";
import MyGachigaPost from "./_components/MyGachigaPost";

import "react-datepicker/dist/react-datepicker.css";
import FilterModal from "./_components/FilterModal";

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

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isMyyMeetingsSelected, setIsMyMeetingsSelected] = useState(false);
  const [isOrderMeetingOpen, setIsOrderMeetingOpen] = useState(false);

  const handleToggle = () => {
    setIsOrderMeetingOpen((prev) => !prev);
  };

  const handleFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const onClose = () => {
    setIsFilterModalOpen(false);
  };
  return (
    <>
      <div className=" ml-10 w-[95%] pr-24">
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
        </div>
        <div className="flex mt-5 text-xs">
          <div className="border border-gray-500 border-solid rounded-2xl bg-white p-1.5 flex flex-row items-center">
            <button onClick={() => handleFilterModal()}>필터 적용하기</button>
          </div>
          {/* 검색 필터 모달창  */}
          {isFilterModalOpen && (
            <FilterModal onClose={onClose} countryCode={countryCode} />
          )}
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
        <div className="pt-5">
          <div className=" p-1.5 flex flex-row items-center text-xs justify-end">
            <button onClick={() => handleToggle()}>신규순</button>
            {isOrderMeetingOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </div>
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
