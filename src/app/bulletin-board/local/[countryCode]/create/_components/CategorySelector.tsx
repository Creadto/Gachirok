"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface CategorySelectorProps {
  onClickDefaultCategory: () => void;
  onClickMeetingsCategory: () => void;
  onClickRealEstateCategory: () => void;
  onClickFleaMarketCategory: () => void;
  onClickRecruitingCategory: () => void;
}

/**
 * @Description 자유게시판, 소모임, 부동산, 벼룩시장, 구인구직의 버튼을 관리하는 Component
 * @author 김영서
 **/
export const CategorySelector = ({
  onClickDefaultCategory,
  onClickMeetingsCategory,
  onClickRealEstateCategory,
  onClickFleaMarketCategory,
  onClickRecruitingCategory,
}: CategorySelectorProps) => {
  //현재 활성화되어 있는 버튼, 기본은 자유게시판
  const [activeButton, setActiveButton] = useState<number>(1);
  const pathname = usePathname();

  const handleButtonClick = (buttonId: number, clickHandler: () => void) => {
    setActiveButton(buttonId); // 클릭한 버튼 ID를 상태에 저장
    clickHandler(); // 해당 버튼의 클릭 핸들러 실행
  };

  useEffect(() => {
    // 현재 pathname을 기반으로 활성화된 버튼을 설정
    if (pathname.includes("meetings")) {
      setActiveButton(2); // 벼룩시장 버튼 활성화
    } else if (pathname.includes("real-estate")) {
      setActiveButton(3); // 소모임 버튼 활성화
    } else if (pathname.includes("flea-market")) {
      setActiveButton(4); // 부동산 버튼 활성화
    } else if (pathname.includes("recruiting")) {
      setActiveButton(5); // 구인구직 버튼 활성화
    } else {
      setActiveButton(1); // 자유게시판 버튼 활성화
    }
  }, [pathname]); // pathname 변경 시마다 실행

  return (
    <div className="flex flex-col">
      <label className="block mt-[40px] text-xs text-[#808080] mb-[10px]">카테고리</label>
      <div className="flex flex-row gap-x-[5px]">
        {/* 자유게시판 */}
        <button
          className="flex flex-col11"
          onClick={() => handleButtonClick(1, onClickDefaultCategory)}
          key={1}
        >
          <div
            className={`flex items-center justify-center ${
              activeButton === 1
                ? "bg-[#E62A2F] text-white"
                : "bg-white text-[#A3A3A3] border border-[#EEEEEE] text-sm "
            }  w-[100px] h-[50px]  rounded-lg`}
          >
            자유게시판
          </div>
        </button>

        {/* 소모임 */}
        <button
          className="flex flex-col"
          onClick={() => handleButtonClick(2, onClickMeetingsCategory)}
          key={2}
        >
          <div
            className={`flex items-center justify-center ${
              activeButton === 2
                ? "bg-[#E62A2F] text-white"
                : "bg-white text-[#A3A3A3] border border-[#EEEEEE] text-sm"
            }  w-[100px] h-[50px]  rounded-lg`}
          >
            소모임
          </div>
        </button>

        {/* 부동산 */}
        <button
          className="flex flex-col"
          onClick={() => handleButtonClick(3, onClickRealEstateCategory)}
          key={3}
        >
          <div
            className={`flex items-center justify-center ${
              activeButton === 3
                ? "bg-[#E62A2F] text-white"
                : "bg-white text-[#A3A3A3] border border-[#EEEEEE] text-sm"
            }  w-[100px] h-[50px]  rounded-lg`}
          >
            부동산
          </div>
        </button>

        {/* 벼룩시장 */}
        <button
          className="flex flex-col"
          onClick={() => handleButtonClick(4, onClickFleaMarketCategory)}
          key={4}
        >
          <div
            className={`flex items-center justify-center ${
              activeButton === 4
                ? "bg-[#E62A2F] text-white"
                : "bg-white text-[#A3A3A3] border border-[#EEEEEE] text-sm"
            }  w-[100px] h-[50px]  rounded-lg`}
          >
            벼룩시장
          </div>
        </button>

        {/* 구인구직 */}
        <button
          className="flex flex-col "
          onClick={() => handleButtonClick(5, onClickRecruitingCategory)}
          key={5}
        >
          <div
            className={`flex items-center justify-center ${
              activeButton === 5
                ? "bg-[#E62A2F] text-white"
                : "bg-white text-[#A3A3A3] border border-[#EEEEEE] text-sm"
            }  w-[100px] h-[50px]  rounded-lg`}
          >
            구인구직
          </div>
        </button>
      </div>
    </div>
  );
};
