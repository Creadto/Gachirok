import { AlertToast } from "@/core/components/AlertToast";
import ScrollToButton from "@/core/components/ScrollToButton";
import { DeleteIcon } from "@/core/components/icons/DeleteIcon";
import { MoreButton } from "@/core/components/icons/MoreButton";
import { ResidentIcon } from "@/core/components/icons/ResidentIcon";
import { TravelIcon } from "@/core/components/icons/TravelIcon";
import { EditIcon } from "@/core/components/icons/top-bar/EditIcon";
import { useGetPostIdComments } from "@/core/hooks/useGetPost";
import useGetUserResponse from "@/core/hooks/useGetUserResponse";
import {
  useDeleteComments,
  usePostComments,
  usePutComments,
} from "@/core/hooks/usePostComments";
import { changeTimeFormatComment } from "@/core/utils/handleTimeFormat";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  CommentResponse,
  ReplyResponse,
  SingleCommentResponse,
} from "../_types/CommentResponse";

interface ReplySectionProps {
  postId: number;
  accessToken: string | undefined;
}

export const ReplySection = ({ postId, accessToken }: ReplySectionProps) => {
  const { data: session } = useSession();
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

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => useGetUserResponse(`Bearer ${session?.accessToken}`), //meeting을 가져오는 react query가 실행된 후에 실시
    enabled: !!session?.accessToken,
    retry: 2,
  });

  const [comments, setComments] = useState<SingleCommentResponse[]>([]);
  const [replyContent, setReplyContent] = useState(""); //본문 댓글 내용
  const [replyReplyContent, setReplyReplyContent] = useState(""); // 대댓글 내용
  const [showToast, setShowToast] = useState(false); //댓글 작성 완료 토스트
  const [showModifyToast, setShowModifyToast] = useState(false); //댓글 수정 완료 토스트
  const [showDeleteToast, setShowDeleteToast] = useState(false); //댓글 삭제 완료 토스트
  const [isEditing, setIsEditing] = useState(false);
  const [modifiyReply, setModifyReply] = useState("");

  const [activeMoreButtonCommentId, setActiveMoreButtonCommentId] = useState<
    number | null
  >(null);

  const [activeReplyCommentId, setActiveReplyCommentId] = useState<
    number | null
  >(null);

  const [activeModifyCommentId, setActiveModifyCommentId] = useState<
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

  //본문의 댓글 수정
  const handleCommentModify = async (commentId: number) => {
    try {
      // 댓글 수정 API 호출
      const response = await usePutComments(
        accessToken,
        modifiyReply,
        commentId
      );
      if (response) {
        const updatedComment: SingleCommentResponse = {
          commentId: response.data.commentId,
          author: response.data.author,
          content: response.data.content,
          createdAt: response.data.createdAt, // 서버에서 가져온 createdAt
          modifiedAt: new Date().toISOString(), // 현재 시간으로 수정
          deleted: false,
          replies: response.data.replies || [], // 필요에 따라 replies를 설정
        };

        // 기존 댓글 목록에서 수정된 댓글로 대체
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.commentId === commentId ? updatedComment : comment
          )
        );

        setShowModifyToast(true);
        setTimeout(() => {
          setShowModifyToast(false);
        }, 3000);
        setModifyReply("");
        setIsEditing(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // 대댓글 수정
  const handleCommentReplyModify = async (
    replyId: number,
    commentId: number
  ) => {
    try {
      // 대댓글 수정 API 호출
      const response = await usePutComments(accessToken, modifiyReply, replyId);
      if (response) {
        const updatedReply: ReplyResponse = {
          commentId: response.data.commentId, // 댓글 ID
          author: response.data.author,
          content: response.data.content,
          createdAt: response.data.createdAt, // 서버에서 가져온 createdAt
          modifiedAt: new Date().toISOString(), // 현재 시간으로 수정
          deleted: false,
        };

        // 댓글 목록에서 해당 대댓글이 포함된 댓글을 찾아서 대댓글 수정
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.commentId === commentId
              ? {
                  ...comment,
                  replies: comment.replies.map((reply) =>
                    reply.commentId === replyId ? updatedReply : reply
                  ),
                }
              : comment
          )
        );

        // 수정 완료 후 토스트 메시지 표시
        setShowModifyToast(true);
        setTimeout(() => {
          setShowModifyToast(false);
        }, 3000);
        setModifyReply(""); // 수정 입력 필드 초기화
        setIsEditing(false); // 수정 모드 종료
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleEditClick = (commentId: number, content: string) => {
    setActiveMoreButtonCommentId(null); // 더보기 버튼 닫기
    setIsEditing(true);
    setModifyReply(content);
    setActiveModifyCommentId((prevId) =>
      prevId === commentId ? null : commentId
    );
  };

  //댓글 삭제
  const handleDeleteClick = async (commentId: number) => {
    setActiveMoreButtonCommentId(null); // Close the "more" button or menu

    try {
      const response = await useDeleteComments(accessToken, commentId);
      if (response.status === 204) {
        // Update the deleted status of the comment in the comments array
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.commentId === commentId
              ? { ...comment, deleted: true } // Create a new object with `deleted` set to true
              : comment
          )
        );

        // Show delete toast
        setShowDeleteToast(true);
        setTimeout(() => {
          setShowDeleteToast(false);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //대댓글 삭제
  const handleReplyDeleteClick = async (commentId: number, replyId: number) => {
    setActiveMoreButtonCommentId(null); // Close the "more" button or menu

    try {
      const response = await useDeleteComments(accessToken, replyId);
      if (response.status === 204) {
        // Update the deleted status of the comment in the comments array
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.commentId === commentId
              ? {
                  ...comment,
                  replies: comment.replies.map((reply) =>
                    replyId === reply.commentId
                      ? { ...reply, deleted: true }
                      : reply
                  ),
                } // Create a new object with `deleted` set to true
              : comment
          )
        );

        // Show delete toast
        setShowDeleteToast(true);
        setTimeout(() => {
          setShowDeleteToast(false);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMoreButton = (commentId: number) => {
    setIsEditing(false);
    setActiveMoreButtonCommentId((prevId) =>
      prevId === commentId ? null : commentId
    );
  };

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter") {
  //     event.preventDefault(); // Prevents form submission or page refresh on Enter

  //     if (replyContent && replyContent.trim() && replyContent.length < 100) {
  //       handleNoParentCommentSubmit();
  //     }
  //   }
  // };

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
          <textarea
            placeholder="댓글을 입력해주세요.(100자 이하)"
            className="bg-[#f6f6f6] w-full h-[80px] rounded-[8px] text-[14px] border-solid border-[1px] border-[#eee] pl-[11px] pr-[80px] py-[15px]"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />

          <div>
            <button
              disabled={
                replyContent.trim().length === 0 || replyContent.length > 100
              }
              onClick={handleNoParentCommentSubmit}
              type="button"
              className="disabled:bg-[#a3a3a3] rounded-md absolute right-3 top-1/2 transform -translate-y-1/2 w-[58px] h-[28px] text-[12px] text-[#fff]  bg-[#000] px-[6px] py-[8px] flex justify-center items-center"
            >
              댓글입력
            </button>
          </div>

          {showToast && <AlertToast content="답글 작성이 완료되었습니다." />}
          {showModifyToast && (
            <AlertToast content="답글 수정이 완료되었습니다." />
          )}
          {showDeleteToast && (
            <AlertToast content="답글 삭제가 완료되었습니다." />
          )}
        </form>
        {replyContent.length > 100 ? (
          <span className="text-red-500 text-sm block mt-[5px] text-end">
            댓글의 길이 제한은 100자입니다.
          </span>
        ) : (
          <span className="text-sm block mt-[5px] text-end">
            {replyContent.length}/100
          </span>
        )}
        <div className="mt-[15px] w-full flex-col gap-y-[20px]">
          {comments.map((comment: SingleCommentResponse) => (
            <div
              className="flex justify-start items-start gap-x-[10px] w-full"
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
              <div className="flex-col flex mb-[20px] w-full">
                <div className="flex justify-start items-center w-full">
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
                  {comment.author.userId === userData?.data.userId &&
                    !comment.deleted && (
                      <div className="relative flex ml-auto">
                        <button
                          onClick={() => handleMoreButton(comment.commentId)}
                        >
                          <MoreButton color="black" />
                        </button>
                        {activeMoreButtonCommentId === comment.commentId && (
                          <div className="absolute right-0 top-6 w-40 bg-white shadow-md rounded-lg z-10">
                            <div className="flex flex-col gap-x-[5x]">
                              {/* 수정하기 */}
                              <button
                                className="flex items-center p-2 w-full"
                                onClick={() =>
                                  handleEditClick(
                                    comment.commentId,
                                    comment.content
                                  )
                                } // Uncomment this line for edit functionality
                              >
                                <div className="flex items-center w-[24px] h-[24px]">
                                  <EditIcon className="w-[24px] h-[24px]" />
                                </div>
                                <span className="flex items-center ml-[2px] text-sm">
                                  수정하기
                                </span>
                              </button>

                              {/* 삭제하기 */}
                              <button
                                className="flex items-center p-2 w-full "
                                onClick={() =>
                                  handleDeleteClick(comment.commentId)
                                }
                              >
                                <div className="flex items-center w-[24px] h-[24px]">
                                  <DeleteIcon />
                                </div>
                                <span className="flex items-center ml-[2px] text-sm">
                                  삭제하기
                                </span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                </div>

                {/* 댓글 내용 */}
                {isEditing && activeModifyCommentId === comment.commentId ? (
                  <div className="relative">
                    <textarea
                      placeholder="수정할 내용을 입력해주세요"
                      className="bg-[#f6f6f6] w-full h-[80px] rounded-[8px] text-[14px] border-solid border-[1px] border-[#eee] pl-[11px] pr-[80px] py-[15px]"
                      value={modifiyReply}
                      onChange={(e) => setModifyReply(e.target.value)}
                      // onKeyDown={handleKeyDown}
                    />
                    <div>
                      <button
                        disabled={
                          modifiyReply.trim().length === 0 ||
                          modifiyReply.length > 100
                        }
                        onClick={() => handleCommentModify(comment.commentId)}
                        type="button"
                        className="disabled:bg-[#a3a3a3] rounded-md absolute right-3 top-1/2 transform -translate-y-1/2 w-[58px] h-[28px] text-[12px] text-[#fff]  bg-[#000] px-[6px] py-[8px] flex justify-center items-center"
                      >
                        댓글 수정
                      </button>
                    </div>
                  </div>
                ) : comment.deleted ? (
                  <div className="mt-[2px] text-[13px]">삭제된 댓글입니다.</div>
                ) : (
                  <div className="mt-[2px] text-[13px]">
                    {comment.content.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                )}

                <div className="flex gap-x-[5px]">
                  {comment.createdAt === comment.modifiedAt ? (
                    <div className="mt-[10px] text-xs text-[#a3a3a3] block">
                      {changeTimeFormatComment(comment.createdAt)}
                    </div>
                  ) : (
                    <div className="mt-[10px] text-xs text-[#a3a3a3] block">
                      {changeTimeFormatComment(comment.modifiedAt)} 수정됨
                    </div>
                  )}

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
                  <>
                    <div className="mt-[10px] w-full relative">
                      <textarea
                        placeholder={`@${comment.author.nickname} 댓글을 입력해주세요.`}
                        className="bg-[#f6f6f6] w-full h-[80px] rounded-[8px] text-[14px] border-solid border-[1px] border-[#eee] pl-[11px] pr-[80px] py-[15px]"
                        value={replyReplyContent}
                        onChange={(e) => {
                          e.stopPropagation();
                          setReplyReplyContent(e.target.value);
                        }}
                        // onKeyDown={handleKeyDown}
                      />
                      <div>
                        <button
                          disabled={
                            replyReplyContent.trim().length === 0 ||
                            replyReplyContent.length > 100
                          }
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
                    {replyReplyContent.length > 100 ? (
                      <span className="text-red-500 text-sm block mt-[5px] text-end">
                        댓글의 길이 제한은 100자입니다.
                      </span>
                    ) : (
                      <span className="text-sm block mt-[5px] text-end">
                        {replyReplyContent.length}/100
                      </span>
                    )}
                  </>
                )}
                {/* 대댓글 내용 */}
                {comment.replies.length > 0 &&
                  comment.replies.map((reply: ReplyResponse) => (
                    <div
                      className="flex justify-start items-start gap-x-[10px] mt-[15px]"
                      key={reply.commentId}
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
                      <div className="flex-col flex w-full">
                        <div className="flex justify-start items-center w-full">
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
                          {reply.author.userId === userData?.data.userId &&
                            !reply.deleted && (
                              <div className="relative flex ml-auto">
                                <button
                                  onClick={() =>
                                    handleMoreButton(reply.commentId)
                                  }
                                >
                                  <MoreButton color="black" />
                                </button>
                                {activeMoreButtonCommentId ===
                                  reply.commentId && (
                                  <div className="absolute right-0 top-6 w-40 bg-white shadow-md rounded-lg z-10">
                                    <div className="flex flex-col gap-x-[5x]">
                                      <button
                                        className="flex items-center p-2 w-full"
                                        onClick={() =>
                                          handleEditClick(
                                            reply.commentId,
                                            reply.content
                                          )
                                        } // Uncomment this line for edit functionality
                                      >
                                        <div className="flex items-center w-[24px] h-[24px]">
                                          <EditIcon className="w-[24px] h-[24px]" />
                                        </div>
                                        <span className="flex items-center ml-[2px] text-sm">
                                          수정하기
                                        </span>
                                      </button>
                                      <button
                                        className="flex items-center p-2 w-full "
                                        onClick={() =>
                                          handleReplyDeleteClick(
                                            comment.commentId,
                                            reply.commentId
                                          )
                                        }
                                      >
                                        <div className="flex items-center w-[24px] h-[24px]">
                                          <DeleteIcon />
                                        </div>
                                        <span className="flex items-center ml-[2px] text-sm">
                                          삭제하기
                                        </span>
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                        </div>

                        {/* 대댓글 내용 */}
                        {isEditing &&
                        activeModifyCommentId === reply.commentId ? (
                          <>
                            <div className="relative">
                              <textarea
                                placeholder="수정할 내용을 입력해주세요"
                                className="bg-[#f6f6f6] w-full h-[80px] rounded-[8px] text-[14px] border-solid border-[1px] border-[#eee] pl-[11px] pr-[80px] py-[15px]"
                                value={modifiyReply}
                                onChange={(e) => setModifyReply(e.target.value)}
                                // onKeyDown={handleKeyDown}
                              />
                              <div>
                                <button
                                  disabled={
                                    modifiyReply.trim().length === 0 ||
                                    modifiyReply.length > 100
                                  }
                                  onClick={() =>
                                    handleCommentReplyModify(
                                      reply.commentId,
                                      comment.commentId
                                    )
                                  }
                                  type="button"
                                  className="disabled:bg-[#a3a3a3] rounded-md absolute right-3 top-1/2 transform -translate-y-1/2 w-[58px] h-[28px] text-[12px] text-[#fff]  bg-[#000] px-[6px] py-[8px] flex justify-center items-center"
                                >
                                  댓글 수정
                                </button>
                              </div>
                            </div>
                            {modifiyReply.length > 100 ? (
                              <span className="text-red-500 text-sm block mt-[5px] text-end">
                                댓글의 길이 제한은 100자입니다.
                              </span>
                            ) : (
                              <span className="text-sm block mt-[5px] text-end">
                                {modifiyReply.length}/100
                              </span>
                            )}
                          </>
                        ) : reply.deleted ? (
                          <div className="mt-[2px] text-[13px]">
                            삭제된 댓글입니다.
                          </div>
                        ) : (
                          <div className="mt-[2px] text-[13px]">
                            {reply.content.split("\n").map((line, index) => (
                              <React.Fragment key={index}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                          </div>
                        )}
                        <div className="flex gap-x-[5px]">
                          <div className="mt-[10px] text-xs text-[#a3a3a3] block">
                            {reply.createdAt === reply.modifiedAt ? (
                              <div className="mt-[10px] text-xs text-[#a3a3a3] block">
                                {changeTimeFormatComment(reply.createdAt)}
                              </div>
                            ) : (
                              <div className="mt-[10px] text-xs text-[#a3a3a3] block">
                                {changeTimeFormatComment(reply.modifiedAt)}{" "}
                                수정됨
                              </div>
                            )}
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
