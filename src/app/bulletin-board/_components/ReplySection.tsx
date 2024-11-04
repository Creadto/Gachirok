import { useQuery } from "@tanstack/react-query";
import {
  CommentResponse,
  ReplyResponse,
  SingleCommentResponse,
} from "../_types/CommentResponse";
import { useGetPostIdComments } from "@/core/hooks/useGetPost";
import { useEffect, useState } from "react";
import Image from "next/image";
import { TravelIcon } from "@/core/components/icons/TravelIcon";
import { ResidentIcon } from "@/core/components/icons/ResidentIcon";
import { changeTimeFormatComment } from "@/core/utils/handleTimeFormat";
import { AlertToast } from "@/core/components/AlertToast";
import { usePostComments } from "@/core/hooks/usePostComments";
import ScrollToBottomButton from "@/core/components/ScrollToButton";
import ScrollToButton from "@/core/components/ScrollToButton";

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

  const [comments, setComments] = useState<SingleCommentResponse[]>([]);
  const [replyContent, setReplyContent] = useState(""); //본문 댓글 내용
  const [replyReplyContent, setReplyReplyContent] = useState(""); // 대댓글 내용
  const [showToast, setShowToast] = useState(false);
  const [activeReplyCommentId, setActiveReplyCommentId] = useState<
    number | null
  >(null);

  const handleReplyClick = (commentId: number) => {
    setActiveReplyCommentId((prevId) =>
      prevId === commentId ? null : commentId
    );
  };

  //본문에 답글을 달 때
  const handleNoParentCommentSubmit = async () => {
    try {
      const response = await usePostComments(accessToken, replyContent, postId);
      if (response) {
        const newComment: SingleCommentResponse = {
          commentId: response.data.commentId,
          author: response.data.author,
          content: replyContent,
          createdAt: new Date().toISOString(),
          modifiedAt: new Date().toISOString(),
          deleted: false,
          replies: [],
        };
        setComments((prevComments) => [...prevComments, newComment]);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
        setReplyContent("");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  //대댓글을 달 때 
  const handleParentCommentSubmit = async (commentId: number) => {
    try {
      const response = await usePostComments(
        accessToken,
        replyReplyContent,
        postId,
        commentId
      );
      if (response) {
        const updatedComments = comments.map((comment) =>
          comment.commentId === commentId
            ? { ...comment, replies: [...comment.replies, response.data] }
            : comment
        );
        setComments(updatedComments);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
        setReplyReplyContent("");
        setActiveReplyCommentId(null);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents form submission or page refresh on Enter

      if (replyContent.length > 0) {
        handleNoParentCommentSubmit();
      }
    }
  };

  useEffect(() => {
    if (postIdCommentData) {
      setComments(postIdCommentData?.comments);
    }
  }, [postIdCommentData]);

  if (isPostIdCommentDataLoading) {
    return (
      <div className="font-bold text-lg flex items-center justify-center">
        답글 항목을 불러오는 중입니다...
      </div>
    );
  }

  if (isPostIdCommentDataError) {
    return (
      <div className="font-bold text-lg flex items-center justify-center">
        답글 항목을 불러오는데 {!!PostIdCommentDataError}가 발생하였습니다.
      </div>
    );
  }

  if (postIdCommentData) {
    return (
      <div>
        {/* 댓글 수 */}
        <p className="text-lg font-semibold mb-[15px]">
          댓글 {comments.length}
        </p>

        <form className="flex flex-row items-center relative mt-[15px]">
          <input
            placeholder="댓글을 입력해주세요."
            className="bg-[#f6f6f6] w-full h-[50px] rounded-[8px] text-[14px] border-solid border-[1px] border-[#eee] px-[11px] py-[15px]"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div>
            <button
              disabled={replyContent.length === 0}
              onClick={handleNoParentCommentSubmit}
              type="button"
              className="disabled:bg-[#a3a3a3] rounded-md absolute right-3 top-1/2 transform -translate-y-1/2 w-[58px] h-[28px] text-[12px] text-[#fff]  bg-[#000] px-[6px] py-[8px] flex justify-center items-center"
            >
              댓글입력
            </button>
          </div>
          {showToast && <AlertToast content="답글 작성이 완료되었습니다." />}
        </form>
        <div className="mt-[15px] w-full flex-col gap-y-[20px]">
          {comments.map((comment: SingleCommentResponse) => (
            <div
              className="flex justify-start items-start gap-x-[10px]"
              key={comment.commentId}
            >
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
                <div className="flex gap-x-[5px]">
                  <div className="mt-[10px] text-xs text-[#a3a3a3] block">
                    {changeTimeFormatComment(comment.createdAt)}
                  </div>

                  {!comment.deleted && (
                    <>
                      <div className="w-[2px] h-[2px] bg-[#a3a3a3] flex items-center rounded-full mt-[16px]"></div>
                      <button
                        className="mt-[10px] text-xs text-[#a3a3a3] block"
                        onClick={() => handleReplyClick(comment.commentId)}
                      >
                        답글달기
                      </button>
                    </>
                  )}
                </div>
                {activeReplyCommentId === comment.commentId && (
                  // 대댓글 입력 창
                  <div className="mt-[10px] w-[300%] relative">
                    <input
                      placeholder={`@${comment.author.nickname} 댓글을 입력해주세요.`}
                      className="bg-[#f6f6f6] w-full h-[50px] rounded-[8px] text-[14px] border-solid border-[1px] border-[#eee] px-[11px] py-[15px]"
                      value={replyReplyContent}
                      onChange={(e) => {
                        e.stopPropagation();
                        setReplyReplyContent(e.target.value);
                      }}
                      // onKeyDown={handleKeyDown}
                    />
                    <div>
                      <button
                        disabled={replyReplyContent.length === 0}
                        onClick={() =>
                          handleParentCommentSubmit(comment.commentId)
                        }
                        type="button"
                        className="disabled:bg-[#a3a3a3] rounded-md absolute right-3 top-1/2 transform -translate-y-1/2 w-[58px] h-[28px] text-[12px] text-[#fff]  bg-[#000] px-[6px] py-[8px] flex justify-center items-center"
                      >
                        댓글입력
                      </button>
                    </div>
                  </div>
                )}
                {/* 대댓글 내용 */}
                {comment.replies.length > 0 &&
                  comment.replies.map((reply: ReplyResponse) => (
                    <div
                      className="flex justify-start items-start gap-x-[10px] mt-[15px]"
                      key={reply.commmentId}
                    >
                      {/* 댓글 유저 사진 */}
                      <div className="w-[34px] h-[34px]">
                        <Image
                          src={reply.author.profilePhotoUrl}
                          width={100}
                          height={100}
                          alt={reply.author.userId.toString()}
                          className="rounded-full object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-col flex">
                        <div className="flex justify-start items-center">
                          {/* 댓글 유저 닉네임 */}
                          <div className="text-sm font-semibold">
                            {reply.author.nickname}
                          </div>

                          {/* 유저 거주자/여행자 배지 */}
                          {reply.author.traveler ? (
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
                        <div className="mt-[2px] text-[13px]">
                          {reply.content}
                        </div>
                        <div className="flex gap-x-[5px]">
                          <div className="mt-[10px] text-xs text-[#a3a3a3] block">
                            {changeTimeFormatComment(reply.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <ScrollToButton />
      </div>
    );
  }
};
