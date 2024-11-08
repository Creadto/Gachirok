"use client";

import { CopyIcon } from "@/core/components/icons/CopyIcon";
import { GreenCheckIcon } from "@/core/components/icons/GreenCheckIcon";
import { LocationIcon } from "@/core/components/icons/LocationIcon";
import { MoreButton } from "@/core/components/icons/MoreButton";
import { ResidentIcon } from "@/core/components/icons/ResidentIcon";
import { ShareButton } from "@/core/components/icons/ShareButton";
import { TravelIcon } from "@/core/components/icons/TravelIcon";
import { LoadingSpinner } from "@/core/components/LoadingSpinner";
import { VisitorProfileModal } from "@/core/components/VisitorProfileModal";
import { useGetMeetingsId } from "@/core/hooks/useGetMeetings";
import { useGetUserProfileResponse } from "@/core/hooks/useGetProfile";
import { useGetPurchaseProfileResponse } from "@/core/hooks/useGetPurchaseProfile";
import { interestsOptions } from "@/core/types/InterestsAndExpertisesOptions";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify"; //dangerouslySetInnerHTML을 xss 공격으로부터 보호
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MemberResponse } from "../_types/MemberResponse";
import { HostMoreButton } from "./_components/HostMoreButton";
import { ImageSection } from "./_components/ImageSection";
import { RightFloatModal } from "./_components/RightFloatModal";
import { VisitorMoreButton } from "./_components/VisitorMoreButton";
interface MeetingDetailsPageProps {
  params: {
    meetingId: number;
  };
}

/**
 * @Description 소모임의 상세 페이지
 * @author 김영서
 **/
const MeetingDetailsPage = ({ params }: MeetingDetailsPageProps) => {
  const { meetingId } = params;
  const { data: session } = useSession();

  // 더보기 버튼
  const [isMoreButtonOpen, setIsMoreButtonOpen] = useState(false);

  // 호스트 여부
  const [isHost, setIsHost] = useState(false);

  //가입 여부
  const [isJoined, setIsJoined] = useState(false);

  //복사 모달창 등장 여부
  const [showToast, setShowToast] = useState(false);

  const [isVisitorProfileOpen, setIsVisitorProfileOpen] = useState(false);
  const [targetUserId, setTargetUserId] = useState<number | null>(null);

  const handleVisitorProfileModal = (userId: number) => {
    setIsVisitorProfileOpen(true);
    setTargetUserId(userId);
  };

  const {
    data: meetingData,
    isLoading: isMeetingLoading,
    isError: isMeetingError,
    error: meetingError,
    refetch: refetchMeetingData,
  } = useQuery({
    queryKey: ["meetingID", meetingId],
    queryFn: () => useGetMeetingsId(meetingId, session?.accessToken),
    enabled: !!meetingId,
    retry: 2,
  });

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => useGetUserProfileResponse(session?.accessToken), //meeting을 가져오는 react query가 실행된 후에 실시
    enabled: !!session?.accessToken,
    retry: 2,
  });

  const { data: userPurchaseData } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: () => useGetPurchaseProfileResponse(session?.accessToken), //meeting을 가져오는 react query가 실행된 후에 실시
    enabled: !!session?.accessToken,
    retry: 2,
  });

  const introRef = useRef(null);
  const locationRef = useRef(null);
  const membersRef = useRef(null);
  const infoRef = useRef(null);

  const [activeButton, setActiveButton] = useState<string | null>("intro");

  const scrollToSection = (
    ref: React.RefObject<HTMLElement>,
    buttonName: string
  ) => {
    setActiveButton(buttonName);
    if (ref.current) {
      const elementPosition =
        ref.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - 140; //위치를 140px만큼 위로 올림
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const buttonRef = useRef<HTMLDivElement>(null); // 버튼을 감싸는 ref

  const handleMoreButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 부모 요소의 이벤트가 발생하지 않도록 함
    setIsMoreButtonOpen((prev) => !prev); // 버튼 열기/닫기 토글
  };

  // 스크롤 위치를 확인하기 위한 코드
  const useIntersectionObserver = () => {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
      // IntersectionObserver callback function
      const callback: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const labelId = entry.target.getAttribute("data-label-id");
            if (labelId) {
              setActiveButton(labelId);
            }
          }
        });
      };

      const observer = new IntersectionObserver(callback, {
        threshold: 0.8, // 60%가 화면에 보일 때 trigger
      });

      const labels = document.querySelectorAll<HTMLElement>(
        "section[data-label-id]"
      );
      labels.forEach((label) => observer.observe(label));

      // Cleanup the observer on unmount
      return () => {
        labels.forEach((label) => observer.unobserve(label));
      };
    }, []);

    return observer;
  };

  const observer = useIntersectionObserver();

  // 가시성 관찰할 요소는 section 태그
  useEffect(() => {
    const h1Elements = document.querySelectorAll<HTMLHeadingElement>("section");
    h1Elements.forEach((el) => {
      if (observer.current) {
        observer.current.observe(el);
      }
    });

    // Cleanup the observation on unmount
    return () => {
      if (observer.current) {
        h1Elements.forEach((el) => {
          observer.current?.unobserve(el);
        });
      }
    };
  }, [observer]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMoreButtonOpen(false); // 외부 클릭 시 버튼 닫기
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (meetingData?.visitorStatus === "host") {
      setIsHost(true);
    }

    if (meetingData?.visitorStatus === "accept") {
      setIsJoined(true);
    } else {
      setIsJoined(false);
    }
  }, [meetingData, isMoreButtonOpen, isJoined]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(meetingData.location)
      .then(() => {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("복사 실패", error);
        alert("주소 복사에 실패했습니다.");
      });
  };

  if (isMeetingLoading || isUserLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <LoadingSpinner loading={isMeetingLoading || isUserError} />{" "}
        {/* 로딩 스피너 */}
        <span className="text-3xl font-bold mt-[20px]">
          로딩중... 잠시만 기다려주세요
        </span>
      </div>
    );
  }

  if (isMeetingError) {
    return (
      <div>미팅을 가져오는데 {meetingError.message}가 발생하였습니다. </div>
    );
  }

  if (userError) {
    return (
      <div>유저 정보를 가져오는데 {userError.message}가 발생하였습니다. </div>
    );
  }

  if (meetingData && userData && userPurchaseData)
    return (
      <>
        <div className=" h-full  ml-[21.4%] mr-[21.4%] mt-[30px] flex flex-row gap-x-[3.6%] relative max-w-[1460px] min-w-[1460px]">
          <div className="w-full ml-auto h-full flex flex-col">
            {/* 잔여 자리 / 카테고리 */}
            <div className="flex gap-x-[5px]">
              {/* 잔여자리 */}
              <div className="rounded-[4px] bg-[#ffe9ea] px-[7px] py-[3px]">
                {meetingData.maxMember - meetingData.members.length === 0 ? (
                  <span className="text-[13px] text-[#e62a2f]">
                    잔여 자리 없음
                  </span>
                ) : (
                  <span className="text-[13px] text-[#e62a2f]">
                    {meetingData.maxMember - meetingData.members.length}자리
                    남음
                  </span>
                )}
              </div>

              {/* 카테고리 */}
              <div className="rounded-[4px] bg-[#f6f6f6] px-[7px] py-[3px]">
                <span className="text-[13px] text-[#808080]">
                  {meetingData.interests
                    .map(
                      (interest: string) =>
                        interestsOptions.find(
                          (value) => value.value === interest
                        )?.label
                    )
                    .join("/")}
                </span>
              </div>

              {/* 1. 방장 멤버 없을 시
2. 참여하지 않았을 때 신고하기만
3. 참여취소 / 신고하기
 */}
              {/* 공유버튼 */}
              <button className="flex ml-auto mr-[15px]">
                <ShareButton />
              </button>

              {/* 더보기버튼 */}
              {/* 더보기버튼 */}
              <div className="flex justify-end relative" ref={buttonRef}>
                <button
                  onClick={handleMoreButton}
                  className="flex items-center"
                >
                  {isMoreButtonOpen ? (
                    <MoreButton color="#e62a2f" />
                  ) : (
                    <MoreButton color="#000" />
                  )}
                </button>

                {/* HostMoreButton */}
                {isMoreButtonOpen && isHost && (
                  <div className="absolute top-[40px] right-0 z-20">
                    {/* 필요한 경우 위치 조정 */}
                    <HostMoreButton
                      meetingData={meetingData}
                      accessToken={session?.accessToken}
                      refetch={refetchMeetingData}
                    />
                  </div>
                )}

                {/* VisitorMoreButton */}
                {isMoreButtonOpen && !isHost && (
                  <div className="absolute top-[5px] right-0">
                    {/* 필요한 경우 위치 조정 */}
                    <VisitorMoreButton
                      meetingData={meetingData}
                      accessToken={session?.accessToken}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 모임 제목 */}
            <div className="mt-[10px] text-[25px] font-bold">
              {meetingData.title}
            </div>

            <div className="flex mt-[10px] gap-x-[5px] items-center">
              {/* 호스트 이미지 */}
              <button
                className="flex gap-x-[5px] items-center"
                onClick={() => handleVisitorProfileModal(meetingData.hostId)}
              >
                <div className="w-[20px] h-[20px] rounded-full flex items-center justify-center my-auto">
                  <Image
                    src={meetingData.hostPhotoUrl}
                    width={20}
                    height={20}
                    alt="Profile"
                    className=" w-[20px] h-[20px] rounded-full object-cover"
                  />
                </div>

                {/* 호스트 이름  */}
                <span className=" text-[13px] flex items-center justify-center">
                  {meetingData?.hostNickname}
                </span>
              </button>

              {/* 여행자 or 거주자 */}
              <div className="flex items-center justify-center">
                {userData?.traveler ? <TravelIcon /> : <ResidentIcon />}
              </div>

              <div className="w-[2px] h-[2px] bg-[#a3a3a3] flex items-center justify-center rounded-full my-auto"></div>

              {/* 모임 개설 날짜 */}
              <div className="flex items-center justify-center">
                <span className="text-[13px] text-[#a3a3a3]">24-08-26</span>
              </div>
            </div>

            {/* 모임 사진 */}
            <div className="w-full mt-[30px]">
              <ImageSection photoUrls={meetingData.photoUrls} />
            </div>

            {/*  네비게이션바  */}
            <div className="w-full mt-[30px] flex gap-x-[30px] shadow-sm sticky top-[81px] bg-white border-none">
              <button
                className={`pb-[15px] pt-[10px] font-bold text-lg border-b-4 ${
                  activeButton === "intro"
                    ? "border-black"
                    : "border-transparent"
                }`}
                onClick={() => scrollToSection(introRef, "intro")}
              >
                모임소개
              </button>
              <button
                className={`pb-[15px] pt-[10px] font-semibold text-lg border-b-4 ${
                  activeButton === "location"
                    ? "border-black"
                    : "border-transparent"
                }`}
                onClick={() => scrollToSection(locationRef, "location")}
              >
                위치
              </button>
              <button
                className={`pb-[15px] pt-[10px] font-semibold text-lg border-b-4 ${
                  activeButton === "members"
                    ? "border-black"
                    : "border-transparent"
                }`}
                onClick={() => scrollToSection(membersRef, "members")}
              >
                참여멤버
              </button>
              <button
                className={`pb-[15px] pt-[10px] font-semibold text-lg border-b-4 ${
                  activeButton === "info"
                    ? "border-black"
                    : "border-transparent"
                }`}
                onClick={() => scrollToSection(infoRef, "info")}
              >
                안내사항
              </button>
            </div>

            {/* 모임소개 */}
            <section ref={introRef} data-label-id="intro">
              <div className=" mt-[40px]">
                <label className="font-semibold text-lg">모임소개</label>
                <div
                  className="mt-[15px]"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(meetingData.introduction),
                  }}
                ></div>
                <div className="w-full h-[400px]"></div>
              </div>
            </section>

            <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

            {/* 위치 */}
            <section ref={locationRef} data-label-id="location">
              <label className="text-lg font-semibold">위치</label>
              <div className="flex mt-[15px]  items-center">
                <LocationIcon />
                <span className="text-[15px] font-semibold ml-[10px]">
                  {meetingData.location}
                </span>
                <button
                  className="flex ml-auto items-center"
                  onClick={handleCopy}
                >
                  <CopyIcon />
                  <span className="text-xs text-[#0676fc]">주소복사</span>
                </button>
              </div>

              <div className="h-[300px] w-full bg-red-500 mt-[15px] flex items-center justify-center text-[33px]">
                주소 이미지
              </div>
              <div className="w-full h-[400px]"></div>
            </section>

            <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

            {/* 참여멤버 */}
            <section ref={membersRef} data-label-id="members">
              <label className="font-semibold text-lg">
                참여 멤버 {meetingData.members.length}
              </label>
              {/* 방장 */}
              {/* <div className="mt-[15px] flex gap-x-[10px]">
            <Image
              src={meetingData.hostPhotoUrl}
              width={40}
              height={40}
              alt="Host Profile Photo"
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
            <div className="flex flex-col">
              <div className="flex gap-x-[5px] items-center">
                <span className="font-semibold text-[15px]">
                  {meetingData.hostNickname}
                </span>
                <span className="px-[6px] py-[3px] bg-black text-white rounded-[2px] text-[10px]">
                  방장
                </span>
                <span className="px-[6px] py-[3px] bg-[#eeeeee] text-[#808080] rounded-[2px] text-[10px]">
                  lv.{meetingData.hostValue}
                </span>
              </div>
              <span className="text-xs text-[#808080]">
                선한 사람들과의 신나는 여행일기
              </span>
            </div>
          </div> */}
              {/*  참여 멤버들 */}
              {meetingData?.members?.map(
                (member: MemberResponse, index: number) => (
                  <div
                    className="mt-[20px] flex gap-x-[10px]"
                    key={member.userId}
                  >
                    <Image
                      src={member.profilePhotoUrl}
                      width={40}
                      height={40}
                      alt="Host Profile Photo"
                      className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer"
                      onClick={() => handleVisitorProfileModal(member.userId)}
                    />
                    <div className="flex flex-col">
                      <button
                        className="flex gap-x-[5px] items-center"
                        onClick={() => handleVisitorProfileModal(member.userId)}
                      >
                        <span className="font-semibold text-[15px]">
                          {member.nickname}
                        </span>
                        {/* members 배열의 첫번째 index에 해당하면(방장이면) */}
                        {index === 0 && (
                          <span className="px-[6px] py-[3px] bg-black text-white rounded-[2px] text-[10px]">
                            방장
                          </span>
                        )}
                        {/* <span className="px-[6px] py-[3px] bg-[#eeeeee] text-[#808080] rounded-[2px] text-[10px]">
                      lv.{member.guestValue}
                    </span> */}
                      </button>

                      <span className="text-xs text-[#808080]">
                        {member.introduction}
                      </span>
                    </div>
                  </div>
                )
              )}
              <div className="w-full h-[400px]"></div>
            </section>

            <hr className="w-full bg-[#EEEEEE] mt-[40px] mb-[30px]" />

            {/* 안내사항 */}
            <section ref={infoRef} data-label-id="info">
              <label className="font-semibold text-lg">안내사항</label>

              <div className="mt-[15px]">
                <div className="rounded-[15px] p-[15px] bg-[#f6f6f6] flex gap-x-[10px]">
                  <GreenCheckIcon />
                  <span className="text-sm block">
                    {meetingData.information}
                  </span>
                </div>
                <div className="w-full h-[400px]"></div>
              </div>
            </section>

            <hr className=" bg-[#EEEEEE] flex items-center justify-center mx-auto w-full" />

            {/* 이전으로 다음으로 */}
            <div className=" w-full py-[20px] gap-x-[80px] flex items-center justify-start mx-auto">
              <div className="text-[15px] whitespace-nowrap ">이전으로</div>
              <span className="text-[15px] font-semibold">
                여기에는 이전 항목 제목이 나와야 합니다
              </span>
            </div>
            <hr className=" bg-[#EEEEEE] flex items-center justify-center mx-auto w-full" />
            <div className="flex py-[20px] gap-x-[80px] items-center justify-start mx-auto w-full">
              <div className="text-[15px] whitespace-nowrap flex ">
                다음으로
              </div>
              <span className="text-[15px] font-semibold">
                여기에는 다음 항목 제목이 나와야 합니다
              </span>
            </div>
            <hr className=" bg-[#EEEEEE] flex items-center justify-center mx-auto w-full" />
            <div className="mt-[50px] flex items-center justify-center bg-black px-[70px] py-[19px] mx-auto mb-[150px] rounded-lg">
              <span className="text-white font-semibold text-[15px]">
                목록으로
              </span>
            </div>
          </div>

          {/* 오른쪽 Float 버튼 */}

          <RightFloatModal
            meetingData={meetingData}
            userPurchaseData={userPurchaseData.data}
            accessToken={session?.accessToken as string}
            setIsJoined={setIsJoined}
          />
          {/* <div>Meeting Details of Id: {meetingId}</div> */}
        </div>
        {showToast ? (
          <div className="flex flex-row item-center fixed bottom-[50px] right-[50px] w-[320px] h-[60px] px-[20px] py-[15px] border border-l-4 border-solid border-[#eee] border-l-[#e62a2f] rounded-[5px] bg-[#fff] animate-bounce">
            <div className="flex items-center justify-center mr-[15px]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#fgfdvtzs6a)">
                  <path
                    d="M9 18A9 9 0 1 0 9 0a9 9 0 0 0 0 18z"
                    fill="#E62A2F"
                  />
                  <path
                    d="m5.672 8.708 2.565 2.565L12.33 6.73"
                    stroke="#fff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="fgfdvtzs6a">
                    <path fill="#fff" d="M0 0h18v18H0z" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <hr className="w-[1px] h-[30px] bg-[#eee]" />
            <div className="flex items-center justify-center ml-[15px] text-[15px]">
              주소가 복사되었습니다.
            </div>
          </div>
        ) : null}
        {isVisitorProfileOpen && targetUserId && (
          <VisitorProfileModal
            session={session}
            setIsVisitorProfileOpen={setIsVisitorProfileOpen}
            targetUserId={targetUserId}
          />
        )}
      </>
    );
};

export default MeetingDetailsPage;
