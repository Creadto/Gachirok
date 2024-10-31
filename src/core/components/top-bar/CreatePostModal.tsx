"use client";

import { countryStore } from "@/core/store/country-store";
import CloseIcon from "../icons/CloseIcon";
import { count } from "console";

interface CreatePostModalProps {
  onClickUniversal: () => void;
  onClickLocal: () => void;
  toggleModal: () => void;
}

/**
 * @Description 글쓰기 버튼을 눌렀을 때 Universal or Local에 작성할지에 관한 모달창
 * @author 김영서
 **/
const CreatePostModal = ({
  onClickLocal,
  onClickUniversal,
  toggleModal,
}: CreatePostModalProps) => {
  const { countryName } = countryStore();

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center" // 전체 화면을 덮는 덮개
    >
      <div
        className="w-[314px] h-[293px] bg-white rounded-lg border-transparent border" // 모달 스타일
        style={{ position: "absolute", top: "70px", right: "368px" }} // 모달 위치
      >
        <div className="w-full h-[60px] flex relative shadow">
          <span className="block pt-[17px] pl-[89px] font-bold ">
            업로드 위치 선택
          </span>
          <div className="absolute right-[15px] top-[15px]">
            <button onClick={toggleModal}>
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className="w-[247px] h-[44px] pt-[15px] mx-auto flex flex-col items-center box-border text-center text-[15px] mb-[26px]">
          <span className="whitespace-nowrap">{`Universal' 또는 'Local : ${countryName} 중`}</span>
          <span>{`업로드 위치를 선택해주세요.`}</span>
        </div>

        <div className="h-[56px] w-[284px] mx-auto bg-neutral-100 rounded-lg justify-center items-center gap-2.5 flex">
          <div className="text-center text-neutral-400 p-3 text-[11px] font-medium font-['Pretendard'] whitespace-nowrap">
            <span>Universal : 자유게시판</span>
            <br />
            <span className="whitespace-nowrap">
              Local : 자유게시판, 소모임, 부동산, 자유시장, 구인구직
            </span>
          </div>
        </div>

        <div className="flex absolute bg-[#E62A2F] right-[50px] bottom-[55px] w-[67px] h-[24px] rounded-2xl text-[11px] text-white item-center justify-center py-[5px] px-[8px]">
          {countryName}
        </div>
        <div className=" mt-[40px] mx-auto w-[284px] h-[52px] flex flex-row gap-x-[10px]">
          <button className="border-2 border-[#E62A2F] rounded-[8px] flex-1 py-[15px] px-[33px]" onClick={onClickUniversal}>
            Universal
          </button>

          <button className="border-2 border-[#E62A2F] rounded-[8px] flex-1  py-[15px] px-[33px]" onClick={onClickLocal}>
            Local
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;

{
  /* <div className="bg-white p-4 rounded">
          <h2 className="text-lg">업로드 위치 선택</h2>

          <p>
            {`Universal' 또는 'Local : ${countryName}' 중 업로드 위치를
            선택해주세요.`}
          </p>
          <div className="flex flex-row gap-x-6 mt-6">
            <button className="border border-black" onClick={onClickUniversal}>
              Universal
            </button>
            <button className="border-black border" onClick={onClickLocal}>
              Local
            </button>
          </div>
          <button
            className="mt-4 bg-gray-200 px-4 py-2 rounded"
            onClick={toggleModal}
          >
            닫기
          </button>
        </div> */
}
