import { MeetingPreviewResponse } from "@/app/gachiga/_types/MeetingPreviewResponse";
import { LocationIcon } from "@/core/components/icons/LocationIcon";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PageNavigation from "./PageNavigation";
import { useRouter } from "next/navigation";
import { useGetMeetings } from "@/core/hooks/useGetMeetings";
import FilledStarIcon from "@/core/components/icons/FilledStarIcon";
import EmptyStarIcon from "@/core/components/icons/EmptyStarIcon";
import { usePostMeetingsBookmark } from "@/core/hooks/usePostMeetings";

interface GachigaPostProps {
  countryCode: string;
}

/**
 * @Description 메인 페이지 '전체모임'을 그려주는 Component
 * @author 김영서
 **/
const GachigaPost = ({ countryCode }: GachigaPostProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const accessToken = session?.accessToken;

  //전체 모임
  const [meetings, setMeetings] = useState<MeetingPreviewResponse[]>([]);
  //로딩여부
  const [loading, setLoading] = useState(true);
  //현재 페이지
  const [currentPage, setCurrentPage] = useState(1);
  //페이지당 미팅 개수
  const meetingsPerPage = 10;
  //전체 페이지 개수
  const totalPages = Math.ceil(meetings.length / meetingsPerPage);

  // 현재 페이지에서 보여줄 meetings 슬라이싱
  const indexOfLastMeeting = currentPage * meetingsPerPage;
  const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
  const currentMeetings = meetings.slice(
    indexOfFirstMeeting,
    indexOfLastMeeting
  );

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  //API로부터 소모임을 가져오는 함수
  async function loadMeetings() {
    try {
      setLoading(true);
      if (accessToken) {
        const data = await useGetMeetings(accessToken, countryCode);
        setMeetings(data);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  }

  //즐겨찾기 버튼 눌렀을 때 API 요청보내는 함수
  const handleBookmark = (meeting: MeetingPreviewResponse) => {
    try {
      if (accessToken) {
        usePostMeetingsBookmark(accessToken, meeting.meetingId);
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

  useEffect(() => {
    if (accessToken) {
      loadMeetings();
    }
  }, [accessToken, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!meetings.length) {
    return <div>소모임이 존재하지 않습니다.</div>;
  }
  return (
    <>
      <p className="font-bold flex-1">{meetings.length}개 모임</p>
      <div className="grid grid-cols-5 grid-rows-2 gap-4 pt-5 gap-y-5 ">
        {currentMeetings.map((meeting, index) => (
          <div
            className="bg-white shadow-xl rounded-lg w-20% h-[280px] relative"
            key={index}
          >
            <img
              src={meeting.meetingPhotoUrl}
              alt="Event Image"
              className=" rounded-md object-cover w-[256px] h-[155px]"
            />
            <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs rounded">
              진행중
            </div>
            <div className="absolute top-0.5 right-1 p-1">
              <button onClick={() => handleBookmark(meeting)}>
                {meeting.bookmark ? <FilledStarIcon /> : <EmptyStarIcon />}
              </button>
            </div>
            <button
              onClick={() => router.push(`/gachiga/${meeting.meetingId}`)}
            >
              <div className="p-3 ">
                <p className="text-sm text-gray-500 pt-1 flex">9/11 16:20</p>
                <h2 className=" font-bold mt-0.5 text-sm flex">
                  {meeting.title}
                </h2>
                <div className="flex flex-row items-center gap-1 mt-2 text-xs text-gray-400">
                  <LocationIcon />
                  <p>{meeting.location}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex flex-row items-center gap-0.5">
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
                    <span className="text-gray-500">20</span>
                  </div>
                  <span className="text-gray-700">6/10</span>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* 하단 페이지 이동 네비게이션 */}
      <PageNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default GachigaPost;
