import axios from "axios";

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
