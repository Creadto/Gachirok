"use client";

import { CommentIcon, LikeIcon } from "@/core/components/icons/LikeCommentIcon";
import { ReportIconSize30 } from "@/core/components/icons/ReportIcon";
import { ResidentIcon } from "@/core/components/icons/ResidentIcon";
import { EmptyScrapIcon, ScrapIcon } from "@/core/components/icons/ScrapIcon";
import { ShareButton } from "@/core/components/icons/ShareButton";
import { TravelIcon } from "@/core/components/icons/TravelIcon";
import { LoadingSpinner } from "@/core/components/LoadingSpinner";
import { ReportModal } from "@/core/components/ReportModal";
import ToBeforeItem from "@/core/components/ToBeforeItem";
import ToNextItem from "@/core/components/ToNextItem";
import { useDeletePostReactions } from "@/core/hooks/useDeletePost";
import { useGetPostId } from "@/core/hooks/useGetPost";
import { usePostPostReactions } from "@/core/hooks/usePostPost";
import { changeTimeFormatYYMMDD } from "@/core/utils/handleTimeFormat";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify"; //dangerouslySetInnerHTML을 xss 공격으로부터 보호
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ReactionButton } from "../../_components/ReactionButton";
import { ReplySection } from "../../_components/ReplySection";
import { PostSingleResponse } from "../../_types/PostSingleResponse";
import { AlertToast } from "@/core/components/AlertToast";

interface PostPageProps {
  params: {
    postId: number;
  };
}
const PostPage = ({ params }: PostPageProps) => {
  const { postId } = params;
  const { data: session } = useSession();
  const router = useRouter();

  //신고하기 모달
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastContent, setToastContent] = useState("");

  //스크랩 여부
  const [isScrapped, setIsScrapped] = useState<boolean | undefined>(undefined);

  //스크랩 버튼 작동
  const handleScrapButton = async () => {
    try {
      if (isScrapped) {
        setIsScrapped(false);
        const response = await useDeletePostReactions(
          session?.accessToken,
          "POST",
          postId,
          "SCRAP"
        );
        if (response) {
          setToastContent("게시물이 스크랩이 해제되었습니다.");
          setIsToastOpen(true);
          setTimeout(() => {
            setIsToastOpen(false);
          }, 2000);
        }
      } else if (!isScrapped) {
        setIsScrapped(true);
        const response = await usePostPostReactions(
          session?.accessToken,
          "POST",
          postId,
          "SCRAP"
        );
        if (response) {
          setToastContent("게시물이 스크랩되었습니다.");
          setIsToastOpen(true);
          setTimeout(() => {
            setIsToastOpen(false);
          }, 2000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const {
    data: postIdData,
    isLoading: isPostIdLoading,
    isError: isPostIdError,
    error: PostIdError,
  } = useQuery<PostSingleResponse, Error>({
    queryKey: ["post", postId],
    queryFn: () => useGetPostId(session?.accessToken, postId), //meeting을 가져오는 react query가 실행된 후에 실시
    enabled: !!session?.accessToken,
    retry: 2,
  });

  useEffect(() => {
    if (postIdData?.reactions.includes("SCRAP")) {
      setIsScrapped(true);
    }
  }, [postIdData]);

  if (isPostIdLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <LoadingSpinner loading={isPostIdLoading} /> {/* 로딩 스피너 */}
        <span className="text-3xl font-bold mt-[20px]">
          로딩중... 잠시만 기다려주세요
        </span>
      </div>
    );
  }

  if (isPostIdError) {
    return (
      <div>게시글을 가져오는데 {PostIdError.message}가 발생하였습니다. </div>
    );
  }
  if (postIdData) {
    return (
      <>
        <div className="mt-[1.5%] ml-[21.5%] mr-[36.5%] min-w-[800px] max-w-[800px] overflow-x-auto flex flex-col bg-white">
          <section className="px-50 mt-[50px]">
            
            <h1 className="text-[12px] mb-[7px] text-[#a3a3a3]">
              Universal &gt; Bulletin Board
            </h1>
            <div className="flex flex-row justify-between">
              <h1 className="w-[609px] font-bold text-[25px] mb-[10px]">
                {postIdData.title}
              </h1>
              <div className="flex gap-x-[15px]">
                <button className="w-[30px] h-[30px]">
                  <ShareButton />
                </button>
                <button
                  className="w-[30px] h-[30px]"
                  onClick={() => setIsReportModalOpen(true)}
                >
                  <ReportIconSize30 />
                </button>

                <button
                  className="w-[30px] h-[30px]"
                  onClick={handleScrapButton}
                >
                  {isScrapped ? <ScrapIcon /> : <EmptyScrapIcon />}
                </button>
              </div>
            </div>
            <div className="flex flex-row text-[12px] text-[#a3a3a3]">
              <div className="flex mt-[5.5px] items-center">
                {/* 유저 프로필 사진*/}
                <div className="w-[15px] h-[15px] rounded-full">
                  <Image
                    src={postIdData.author.profilePhotoUrl}
                    width={100}
                    height={100}
                    alt={postIdData.author.nickname}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                {/* 유저 닉네임 */}
                <div className="text-[13px] ml-[5px]">
                  {postIdData.author.nickname}
                </div>

                {/* 유저 거주자/여행자 배지 */}
                {postIdData.author.traveler ? (
                  <div className="w-[15px] h-[15px] ml-[3px] flex items-center">
                    <TravelIcon />
                  </div>
                ) : (
                  <div className="w-[15px] h-[15px] ml-[3px] flex items-center">
                    <ResidentIcon />
                  </div>
                )}

                <div className="h-[2px] w-[2px] rounded-full ml-[5px] bg-[#a3a3a3] flex items-center" />

                {/* 작성 날짜 */}
                <div className="text-[13px] text-[#a3a3a3] flex items-center ml-[5px] my-auto">
                  {changeTimeFormatYYMMDD(postIdData.createdAt)}
                </div>

                {/* 좋아요 / 댓글 */}
                <div className="flex mx-[10px]">|</div>
                <div className="flex items-center">
                  <div className=" ml-auto flex gap-x-[2px] items-center">
                    <LikeIcon />
                    <p className="text-[11px] text-[#a3a3a3]">
                      {postIdData.likeCount}
                    </p>
                  </div>
                  <div className="h-[2px] w-[2px] rounded-full mx-[5px] bg-[#a3a3a3] flex items-center" />
                  <div className="flex gap-x-[2px] items-center">
                    <CommentIcon />
                    <p className="text-[11px] text-[#a3a3a3]">
                      {postIdData.commentCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="w-full bg-[#EEEEEE] mt-[30px] mb-[30px]" />

            <div
              className="mt-[15px]"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(postIdData.content),
              }}
            ></div>

            <hr className="w-full bg-[#EEEEEE] mt-[50px] mb-[30px]" />

            {/* 추천 및 비추천 버튼 */}
            <ReactionButton
              postId={postId}
              likeCount={postIdData.likeCount}
              unlikeCount={postIdData.unlikeCount}
              accessToken={session?.accessToken}
              reactions={postIdData.reactions}
            />

            {/* 댓글 */}
            <ReplySection postId={postId} accessToken={session?.accessToken} />

            {/* 이전 뉴스 및 다음 뉴스로 이동하는 버튼 */}
            <div className="mb-[50px]">
              <ToBeforeItem itemType="news" regionType="universal" />
              <hr />
              <ToNextItem itemType="news" regionType="universal" />
            </div>
            <div className="flex justify-center items-center mb-[150px]">
              <button
                className="w-[300px] h-[60px] px-[70px] py-[19px] bg-[#000] text-[#fff] text-[15px] rounded-[8px]"
                onClick={() => router.back()}
              >
                목록으로
              </button>
            </div>
          </section>
        </div>
        {isReportModalOpen && postIdData && (
          <ReportModal
            setIsReportModalOpen={setIsReportModalOpen}
            targetId={postIdData?.postId}
            targetType="POST"
            accessToken={session?.accessToken}
          />
        )}
        {isToastOpen && <AlertToast content={toastContent} />}
      </>
    );
  }
};

export default PostPage;
