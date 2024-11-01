"use client";
import { CoinIcon } from "@/core/components/icons/CoinIcon";
import EmptyStarIcon from "@/core/components/icons/EmptyStarIcon";
import FilledStarIcon from "@/core/components/icons/FilledStarIcon";
import GachigaIcon from "@/core/components/icons/GachigaIconPost";
import { LocationIcon } from "@/core/components/icons/LocationIcon";
import { usePostMeetingsBookmark } from "@/core/hooks/usePostMeetings";
import { countryStore } from "@/core/store/country-store";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MeetingPreviewResponse } from "../_types/MeetingPreviewResponse";
import { FilterSection } from "./[countryCode]/_components/FilterSection";
import PageNavigation from "./[countryCode]/_components/PageNavigation";
import { CreateMeetingsButton } from "./[countryCode]/_components/CreateMeetingsButton";
import { useGetFilteredMeetings } from "@/core/hooks/useGetMeetings";


//필터링된 페이지
const FilteredPage = () => {
  const router = useRouter();
  const { country, setCountry } = countryStore();
  const searchParams = useSearchParams();

  const meetingsParam = sessionStorage.getItem("meetingsParam");
  const size = searchParams ? Number(searchParams.get("size")) || 10 : 10;
  const [page, setPage] = useState(searchParams ? Number(searchParams.get("page")) || 0 : 0);

  const [totalPage, setTotalPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const getCountryCode = () => {
      // 현재 URL에서 쿼리 파라미터를 추출
      const params = new URLSearchParams(window.location.search);
      return params.get("countryCode");
    };
    const countryCode = getCountryCode();
    if (countryCode) {
      setCountry(countryCode);
    }
  }, []);

  const countryCode = country;

  const [meetings, setMeetings] = useState<MeetingPreviewResponse[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  //API로부터 소모임을 가져오는 함수
  async function loadFilteredMeetings() {
    try {
      setLoading(true);
      if (session?.accessToken && meetingsParam) {
        router.push(
          `/gachiga/local?${meetingsParam.toString()}?page=${page}&size=${size}`
        );
        const data = await useGetFilteredMeetings(
          session.accessToken,
          meetingsParam,
          page,
          size
        );
        setMeetings(data.content);
        setTotalElements(data.totalElements);
        setTotalPage(data.totalPages);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setPage(0);
  }, [meetingsParam]);

  useEffect(() => {
    if (session?.accessToken && meetingsParam) {
      loadFilteredMeetings();
      const params = new URLSearchParams(meetingsParam);
      params.set("page", page.toString());
      params.set("size", size.toString());
      router.push(`/gachiga/local?${params.toString()}`);
    }
  }, [page, size, router, meetingsParam, session?.accessToken]);

  //즐겨찾기 버튼 눌렀을 때 API 요청보내는 함수
  const handleBookmark = (meeting: MeetingPreviewResponse) => {
    try {
      if (session?.accessToken) {
        usePostMeetingsBookmark(session.accessToken, meeting.meetingId);
        setMeetings((prevMeetings) =>
          prevMeetings.map((m) =>
            m.meetingId === meeting.meetingId
              ? { ...m, bookmark: !m.bookmark }
              : m
          )
        );
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <div className=" mt-[30px] h-full ml-[8.1%] mr-[8.1%] ">
        <div className="flex flex-row gap-x-[10px] text-[22px] items-center">
          <div>
            <GachigaIcon />
          </div>

          <p className="font-bold">필터된 모임들</p>

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
          <FilterSection countryCode={countryCode} page={page} size={size} />
        </div>
        {!meetings?.length ? (
          <div>No meetings found</div>
        ) : (
          <div>
            <p className="font-bold mt-[20px]">{totalElements}개 모임</p>
            <div className="grid grid-cols-5 gap-x-5 mt-[15px] flex-wrap gap-y-5 z-10">
              {meetings.map((meeting, index) => (
                <div
                  className="bg-white shadow-xl rounded-lg w-auto h-[308px] relative"
                  key={index}
                >
                  <img
                    src={meeting.meetingPhotoUrl}
                    alt="Event Image"
                    className=" rounded-md object-cover w-full h-[155px]"
                  />
                  <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs rounded">
                    {meeting.finished ? "모임완료" : "진행중"}
                  </div>
                  <div className="absolute top-0.5 right-1 p-1">
                    <button onClick={() => handleBookmark(meeting)}>
                      {meeting.bookmark ? (
                        <FilledStarIcon />
                      ) : (
                        <EmptyStarIcon />
                      )}
                    </button>
                  </div>
                  <button
                    className="w-full"
                    onClick={() => router.push(`/gachiga/${meeting.meetingId}`)}
                  >
                    <div className="p-3 ">
                      <p className="text-xs text-[#a3a3a3] pt-1 flex">
                        {meeting.meetingDate} {meeting.meetingStartTime} <br />
                      </p>
                      <h2 className=" font-bold mt-0.5 text-sm flex">
                        {meeting.title}
                      </h2>
                      <div className="flex flex-row items-center gap-1 mt-2 text-xs text-[#808080]">
                        <LocationIcon />
                        <p>{meeting.location}</p>
                      </div>
                    </div>
                    <div className="w-full">
                      {/* <div className="flex flex-row items-center gap-0.5">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.5894 3.10474L12.6534 7.15775L17.2674 7.80774C17.3871 7.82118 17.5005 7.86856 17.5942 7.94427C17.6878 8.01999 17.7579 8.12089 17.7962 8.23511C17.8344 8.34933 17.8392 8.47212 17.81 8.58899C17.7809 8.70585 17.7189 8.81193 17.6314 8.89474L14.2924 12.0487L15.0804 16.5038C15.0979 16.6234 15.0818 16.7455 15.034 16.8566C14.9863 16.9676 14.9087 17.0633 14.8099 17.1329C14.711 17.2025 14.5949 17.2433 14.4742 17.2509C14.3536 17.2585 14.2331 17.2325 14.1264 17.1758L9.99938 15.0757L5.87242 17.1758C5.76567 17.2325 5.64524 17.2585 5.52459 17.2509C5.40393 17.2433 5.28778 17.2025 5.18895 17.1329C5.09012 17.0633 5.01246 16.9676 4.96471 16.8566C4.91696 16.7455 4.90092 16.6234 4.91838 16.5038L5.70641 12.0487L2.36742 8.89474C2.27995 8.81193 2.21796 8.70585 2.18877 8.58899C2.15957 8.47212 2.16438 8.34933 2.20262 8.23511C2.24087 8.12089 2.31097 8.01999 2.40465 7.94427C2.49834 7.86856 2.61173 7.82118 2.73143 7.80774L7.34539 7.15775L9.40941 3.10474C9.46629 2.99761 9.55126 2.90802 9.6552 2.84552C9.75914 2.78302 9.87809 2.75 9.99938 2.75C10.1207 2.75 10.2397 2.78302 10.3436 2.84552C10.4476 2.90802 10.5325 2.99761 10.5894 3.10474Z"
                        stroke="#DDDDDD"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <div className="text-gray-500">20</div>
                  </div> */}
                      {/* <div className="flex items-center w-full absolute bottom-3 left-3 text-start justify-start">
                  <CoinIcon width={24} height={24} />
                  <div className="text-slate-300 text-sm">
                    1
                  </div>
                </div> */}
                      <div className="flex items-center w-full absolute bottom-3 right-3 text-end justify-end">
                        <div className="flex -space-x-5 hover:space-x-0.5 transition duration-1000">
                          {meeting.members.map((member, index) => (
                            <img
                              key={index}
                              src={member.profilePhotoUrl} // Assume member object has profileUrl field
                              alt={member.userId.toString()} // Assume member object has name field
                              className="w-8 h-8 rounded-full border-2 border-white"
                            />
                          ))}
                        </div>
                        <div className="text-[#a3a3a3] text-xs ml-3">
                          {meeting.members.length} / {meeting.maxMember}
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>

            <PageNavigation
              page={page + 1}
              totalPages={totalPage}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FilteredPage;
