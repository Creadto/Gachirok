"use client";

import { BackButton } from "@/app/bulletin-board/_components/BackButton";
import TwoButtonForm from "@/app/create-profile/_components/profile-setup/TwoButtonForm";
import { countryStore } from "@/core/store/country-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { CategorySelector } from "../../_components/CategorySelector";
import RecruitJob from "./RecruitJob";
import RecruitPeople from "./RecruitPeople";

interface AddRecruitingLocalBulletinBoardPageProps {
  params: {
    countryCode: string;
  };
}

/**
 * @Description Local의 Bulletin Board에 구인구직을 작성하는 Page
 * @author 김영서
 **/
export default function AddRecruitingLocalBulletinBoardPage({
  params,
}: AddRecruitingLocalBulletinBoardPageProps) {
  const { country, setCountry } = countryStore();
  const { countryCode } = params;
  const router = useRouter();


  //URL의 param이 변화될때마다 country store update
  useEffect(() => {
    setCountry(countryCode);
    console.log("country", countryCode);
  }, [params]);

  const onValid = (data: any) => {
    console.log(data);
    // 여기에서 데이터를 서버로 전송하거나 다른 작업을 수행합니다.
  };

  //소 카테고리
  const [recruitJob, setRecruitJob] = useState(false);





  return (
    <div className="max-w-4xl mx-auto bg-white mt-[50px] rounded-lg">
      {/* 글쓰기 HEADER */}
      <div className="flex items-center ml-[-45px] space-x-[5px]">
        <BackButton
          onClick={() => router.push(`/bulletin-board/local/${country}`)}
        />
        <h1 className="text-[22px] font-bold">글쓰기</h1>
        <div className="bg-[#DDDDDD] px-[7px] py-[3px] rounded-[4px] text-[#808080]">
          Local
        </div>
        <div className="flex items-end justify-end flex-1">
          <button className="px-[12px] py-[10px] border border-[#EEEEEE] rounded-lg">
            미리보기
          </button>
        </div>
      </div>

      {/* 카테고리-자유게시판, 소모임, 부동산, 벼룩시장, 구인구직*/}
      {/* 별도의 카테고리 별로 URL주소 할당 */}
      <CategorySelector
        onClickDefaultCategory={() => {
          router.push(`/bulletin-board/local/${country}/create`);
        }}
        onClickFleaMarketCategory={() =>
          router.push(`/bulletin-board/local/${country}/create/flea-market`)
        }
        onClickMeetingsCategory={() =>
          router.push(`/bulletin-board/local/${country}/create/meetings`)
        }
        onClickRealEstateCategory={() =>
          router.push(`/bulletin-board/local/${country}/create/real-estate`)
        }
        onClickRecruitingCategory={() =>
          router.push(`/bulletin-board/local/${country}/create/recruiting`)
        }
      />

      {/* 구인/구직 */}
      <TwoButtonForm
        title="소 카테고리"
        options={[
          { label: "구인", value: false },
          { label: "구직", value: true },
        ]}
        activeValue={recruitJob}
        onChange={setRecruitJob}
      />

      <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

      {recruitJob ? <RecruitJob /> : <RecruitPeople />}

      {/* 미리보기 모달창 */}
      {/* <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={handleModal}
        formData={{
          interests: selectedJobCategory,
          title: watch("title"),
          introduction,
          images: watchImages,
          location: watch("location"),
        }}
      /> */}
    </div>
  );
}
