import { useQuery } from "@tanstack/react-query";
import {
  CommentResponse,
  SingleCommentResponse,
} from "../_types/CommentResponse";
import { useGetPostIdComments } from "@/core/hooks/useGetPost";
import { useState } from "react";
import Image from "next/image";
import { TravelIcon } from "@/core/components/icons/TravelIcon";
import { ResidentIcon } from "@/core/components/icons/ResidentIcon";
import { changeTimeFormatComment } from "@/core/utils/handleTimeFormat";
import { AlertToast } from "@/core/components/AlertToast";

interface ReplySectionProps {
  postId: number;
  accessToken: string | undefined;
}

export const ReplySection = ({ postId, accessToken }: ReplySectionProps) => {
  const {
    data: postIdCommentData,
    isLoading: isPostIdCommentDataLoading,
    isError: isPostIdCommentDataError,
    error: PostIdCommentDataError,
  } = useQuery<CommentResponse, Error>({
    queryKey: ["post", postId, "comments"],
    queryFn: () => useGetPostIdComments(accessToken, postId), //meeting을 가져오는 react query가 실행된 후에 실시
    enabled: !!postId,
    retry: 2,
  });

  const [replyContent, setReplyContent] = useState("");
  const [showToast, setShowToast] = useState(false);

  if (isPostIdCommentDataLoading) {
    return (
      <div className="font-bold text-lg flex items-center justify-center">
        답글 항목을 불러오는 중입니다...
      </div>
    );
  }

  if (postIdCommentData) {
    return (
      <div>
        {/* 댓글 수 */}
        <p className="text-lg font-semibold mb-[15px]">
          댓글 {postIdCommentData.commentCount}
        </p>

        <form className="flex flex-row items-center relative mt-[15px]">
          <input
            placeholder="댓글을 입력해주세요."
            className="bg-[#f6f6f6] w-full h-[50px] rounded-[8px] text-[14px] border-solid border-[1px] border-[#eee] px-[11px] py-[15px]"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <div>
            <button
              disabled={replyContent === ""}
              type="button"
              className="disabled:bg-[#a3a3a3] rounded-md absolute right-3 top-1/2 transform -translate-y-1/2 w-[58px] h-[28px] text-[12px] text-[#fff]  bg-[#000] px-[6px] py-[8px] flex justify-center items-center"
              // onClick={onClick}
            >
              댓글입력
            </button>
          </div>
          {showToast && (
          <AlertToast content="답글 작성이 완료되었습니다." />
          )}
        </form>
        <div className="mt-[15px] w-full flex-col gap-y-[20px]">
          {postIdCommentData.comments.map((comment: SingleCommentResponse) => (
            <div className="flex justify-start items-start gap-x-[10px]">
              {/* 댓글 유저 사진 */}
              <div className="w-[34px] h-[34px]">
                <Image
                  src={comment.author.profilePhotoUrl}
                  width={100}
                  height={100}
                  alt={comment.author.userId.toString()}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <div className="flex-col flex mb-[20px]">
                <div className="flex justify-start items-center">
                  {/* 댓글 유저 닉네임 */}
                  <div className="text-sm font-semibold">
                    {comment.author.nickname}
                  </div>

                  {/* 유저 거주자/여행자 배지 */}
                  {comment.author.traveler ? (
                    <div className="w-[16px] h-[16px] ml-[3px] flex items-center">
                      <TravelIcon />
                    </div>
                  ) : (
                    <div className="w-[16px] h-[16px] ml-[3px] flex items-center">
                      <ResidentIcon />
                    </div>
                  )}
                </div>

                {/* 댓글 내용 */}
                <div className="mt-[2px] text-[13px]">{comment.content}</div>
                <div className="mt-[10px] text-xs text-[#a3a3a3]">
                  {changeTimeFormatComment(comment.createdAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};
