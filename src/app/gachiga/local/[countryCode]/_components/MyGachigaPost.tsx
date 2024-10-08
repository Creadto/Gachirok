import { MeetingPreviewResponse } from "@/app/gachiga/_types/MeetingPreviewResponse";
import { LocationIcon } from "@/core/components/icons/LocationIcon";
import { useGetMeetings, useGetMyMeetings } from "@/core/hooks/useGetMeetings";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageNavigation from "./PageNavigation";

const MyGachigaPost = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const accessToken = session?.accessToken;
  const [meetings, setMeetings] = useState<MeetingPreviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const meetingsPerPage = 10;

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

  async function loadMeetings() {
    try {
      setLoading(true);
      if (accessToken) {
        const data = await useGetMyMeetings(accessToken);
        setMeetings(data);
      }
    } catch (error) {
      console.error("Error loading Meetings:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (accessToken) {
      loadMeetings();
    }
  }, [accessToken]);

  if (loading) {
    // Loading screen
    return <div>Loading...</div>;
  }

  if (!meetings.length) {
    // No meetings found
    return <div>No meetings found</div>;
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
            <button
              onClick={() => router.push(`/gachiga/${meeting.meetingId}`)}
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
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.7823 5.8403L18.5237 11.2235L24.6519 12.0868C24.8109 12.1046 24.9615 12.1675 25.0859 12.2681C25.2103 12.3687 25.3034 12.5027 25.3542 12.6544C25.405 12.8061 25.4114 12.9692 25.3726 13.1244C25.3339 13.2796 25.2515 13.4205 25.1354 13.5305L20.7005 17.7196L21.7472 23.6367C21.7704 23.7956 21.749 23.9578 21.6856 24.1053C21.6222 24.2528 21.5191 24.3798 21.3878 24.4723C21.2566 24.5648 21.1023 24.619 20.942 24.6291C20.7818 24.6391 20.6218 24.6046 20.48 24.5292L14.9986 21.74L9.51723 24.5292C9.37543 24.6046 9.21548 24.6391 9.05523 24.6291C8.89498 24.619 8.74072 24.5648 8.60945 24.4723C8.47818 24.3798 8.37504 24.2528 8.31161 24.1053C8.24819 23.9578 8.22689 23.7956 8.25008 23.6367L9.29673 17.7196L4.86192 13.5305C4.74574 13.4205 4.66342 13.2796 4.62464 13.1244C4.58587 12.9692 4.59224 12.8061 4.64304 12.6544C4.69385 12.5027 4.78694 12.3687 4.91137 12.2681C5.0358 12.1675 5.18641 12.1046 5.3454 12.0868L11.4736 11.2235L14.215 5.8403C14.2906 5.69802 14.4034 5.57902 14.5415 5.49601C14.6795 5.413 14.8375 5.36914 14.9986 5.36914C15.1597 5.36914 15.3178 5.413 15.4558 5.49601C15.5939 5.57902 15.7067 5.69802 15.7823 5.8403Z"
                    fill="white" //비울려면 none
                    fillOpacity="1"
                    stroke="white"
                    strokeWidth="1.8"
                  />
                </svg>
              </div>
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

      <PageNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default MyGachigaPost;
