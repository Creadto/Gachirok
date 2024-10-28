import CloseIcon from "@/core/components/icons/CloseIcon";
import { MemberResponse } from "../../_types/MemberResponse";
import SearchIcon from "@/core/components/icons/top-bar/SearchIcon";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MoreButton } from "@/core/components/icons/MoreButton";
import { ProfileDetailModal } from "./ProfileDetailModal";
import { useQuery } from "@tanstack/react-query";
import { useGuestMemberResponse } from "@/core/hooks/useGuest";

interface MemberManagementModalProps {
  setIsMemberManageModalOpen: (value: boolean) => void;
  accessToken: string | undefined;
  meetingId: number;
  approval: boolean;
  question: string;
}


/**
 * @Description 해당 모임의 멤버 관리 모달창
 * @author 김영서
 **/
export const MemberManagementModal = ({
  setIsMemberManageModalOpen,
  accessToken,
  meetingId,
  approval,
  question
}: MemberManagementModalProps) => {
  //검색 결과
  const [searchUser, setSearchUser] = useState<string>("");

  const {
    data: guestData,
    isLoading: isGuestDataLoading,
    isError: isGuestDataError,
    error: guestError,
  } = useQuery({
    queryKey: [meetingId, "guests"],
    queryFn: () => useGuestMemberResponse(accessToken, meetingId),
    enabled: !!meetingId,
    retry: 2,
  });

  //선택된 유저
  const [selectedMember, setSelectedMember] = useState<MemberResponse | null>(
    null
  );

  //유저 프로필 더보기
  const [isProfileDetailOpen, setIsProfileDetailOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault(); // 스페이스 입력 방지
    }
  };

  //검색창에 닉네임 입력한 결과값
  const filteredMembers = guestData?.data.filter((data: MemberResponse) => {
    const nicknameWithoutSpaces = data.nickname.replace(/\s+/g, "");

    return (
      nicknameWithoutSpaces.includes(searchUser?.toLowerCase()) ||
      nicknameWithoutSpaces.includes(searchUser?.toUpperCase())
    );
  });

  if(isGuestDataError) {
    return(
      <div>
        {guestError.message}가 발생하였습니다.
      </div>
    )
  }


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 cursor-default">
      <div
        className="bg-white rounded-[15px] shadow-lg w-[550px] h-[657px] relative cursor-default px-[15px] scrollable-container overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* 모달 HEADER */}
        <div className="flex flex-row">
          <div className="w-full h-[60px] flex items-start justify-start shadow-sm">
            <span className="font-bold text-lg flex mx-auto items-center justify-center my-auto">
              멤버 관리
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsMemberManageModalOpen(false);
            }}
            className="absolute top-[15px] right-[15px] text-black hover:text-gray-800"
          >
            <CloseIcon />
          </button>
        </div>

{/* 검색창 */}
        <div className=" flex w-full items-center justify-center gap-x-[5px] relative mt-[10px] ">
              <SearchIcon />
              <input
                type="text"
                placeholder="멤버명 검색 (공백 없이 입력)"
                onChange={(e) => setSearchUser(e.target.value)}
                className="w-full  flex border border-[#eeeeee] rounded-[15px] bg-[#f6f6f6]  py-[8px] pl-[39px] pr-[10px] gap-x-[2px] text-[13px] focus:outline-none focus:ring-2 focus:ring-gray-300 "
              />
            </div>


        {isGuestDataLoading && (
          <div className="flex items-center justify-center mt-[50%]">
            <span className="text-sm text-[#808080]">
              참여 멤버 데이터를 로딩중입니다...
            </span>
          </div>
        )}

        {/* 멤버 표시 */}
        {guestData?.data.length === 0 ? (
          <div className="flex items-center justify-center mt-[50%]">
            <span className="text-sm text-[#808080]">참여 멤버가 없습니다</span>
          </div>
        ) : (
          <>

{/* 멤버 목록 */}
            {filteredMembers?.map((member: MemberResponse) => {
              return (
                <div
                  className="mt-[20px] flex gap-x-[10px]"
                  key={member.userId}
                >
                  <Image
                    src={member.profilePhotoUrl}
                    width={40}
                    height={40}
                    alt="Host Profile Photo"
                    className="w-[40px] h-[40px] rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="flex gap-x-[5px] items-center">
                      <span className="font-semibold text-[15px]">
                        {member.nickname}
                      </span>
                      {/* <span className="px-[6px] py-[3px] bg-[#eeeeee] text-[#808080] rounded-[2px] text-[10px]">
                        lv.{member.guestValue}
                      </span> */}
                    </div>
                    <span className="text-xs text-[#808080] text-start">
                      {member.introduction}
                    </span>
                  </div>
                  <button
                    className="flex items-start justify-end ml-auto"
                    onClick={() => {
                      setSelectedMember(member);
                      setIsProfileDetailOpen(true);
                    }}
                  >
                    <MoreButton color="gray" />
                  </button>
                </div>
              );
            })}
            <div className="mt-[20px] h-[200px]"></div>
            <div className="mt-[20px] h-[200px]"></div>
            <div className="mt-[20px] h-[200px]"></div>
            <div className="mt-[20px] h-[200px]"></div>
          </>
        )}
      </div>
      {isProfileDetailOpen && selectedMember && (
        <ProfileDetailModal
        setIsMemberManageModalOpen={setIsMemberManageModalOpen}
          selectedMember={selectedMember}
          setIsProfileDetailOpen={setIsProfileDetailOpen}
          accessToken={accessToken}
          meetingId={meetingId}
          approval={approval}
          question={question}
        />
      )}
    </div>
  );
};
