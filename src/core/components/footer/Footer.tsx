import Image from "next/image";
import { TextLogo } from "../TextLogo";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "../icons/SNSIcon";

export const Footer = () => {
  return (
    <div className="w-full h-[313px] bg-[#EEEEEE] relative">
      <div className="absolute top-[40px] left-[360px] flex flex-col space-y-[20px]">
        {/* 로고 */}
        <TextLogo />

        {/* 이용약관 / 개인정보처리방침 버튼 */}
        <div className="flex space-x-[20px]">
          <button className="text-[15px]">이용약관</button>
          <button className="text-[15px]">개인정보처리방침</button>
        </div>

        {/* 세부정보 */}
        <div className="flex flex-col space-y-[8px] text-[#808080] text-[13px]">
          <span className="flex ">
            대표이사 : 홍길동 | 사업자 등록번호 : 123-45-6789 제휴/문의 :
            gachiga.co.kr
          </span>
          <span>
            주소 : 서울 마포구 마포동 마포빌라 111-11 | 대표 번호 : 02-1234-5678
          </span>
          <span>
            행정사업무신고번호 : 12345678900000 | 통신판매신고번호 :
            012345678-56-789
          </span>
        </div>
        <div className="flex space-x-[20px] text-[#A3A3A3] text-xs ">
          <p>(주) Creadto</p>
          <p>&copy;2024 Gachiga all rights reserved</p>
        </div>
      </div>

      <div className="absolute right-[360px] top-[40px] space-y-[40px]">
        {/* SNS버튼 */}
        <div className="flex flex-row space-x-[15px] items-end justify-end">
          <button>
            <FacebookIcon />
          </button>
          <button>
            <InstagramIcon />
          </button>
          <button>
            <YoutubeIcon />
          </button>
        </div>

        {/* 대표번호 */}
        <div className="flex flex-col space-y-[20px]">
          <div className="flex flex-col space-y-[5px]">
            <p className="flex items-end justify-end font-semibold text-lg text-[#808080]">
              대표번호
            </p>
            <p className="flex items-end justify-end text-[36px]">
              02-1234-5678
            </p>
          </div>
          <div className="flex flex-col text-[#808080] text-[13px]">
            <p className="flex items-end justify-end">평일 오전 09시 ~ 오후 18시</p>
            <p className="flex items-end justify-end"> (점심시간 : 평일 오후 12시 ~ 오후 1시)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
