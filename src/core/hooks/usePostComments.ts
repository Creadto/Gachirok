import axios from "axios";
import { comment } from "postcss";

/**
 * @Description 부모 댓글이 없는 댓글 생성
 * @author 김영서
 **/
export async function usePostComments(
  accessToken: string | undefined,
  content: string,
  postId: number,
  parentCommentId?: number
) {
  const response = await axios.post(`/api/posts/${postId}/comments`, {
    "content": content,
    "parentCommentId": parentCommentId
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
}

/**
 * @Description 댓글 내용 수정
 * @author 김영서
 **/
export async function usePutComments(
  accessToken: string | undefined,
  content: string,
  commentId: number,
) {
  const response = await axios.put(`/api/posts/comments/${commentId}`, {
    "content": content,
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
}

/**
 * @Description 댓글 삭제
 * @author 김영서
 **/
export async function useDeleteComments(
  accessToken: string | undefined,
  commentId: number,
) {
  const response = await axios.delete(`/api/posts/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
}


