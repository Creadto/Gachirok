import axios from "axios";

/**
 * @Description 게시글 리액션 제거
 * @author 김영서
 **/
export async function useDeletePostReactions(
  accessToken: string | undefined,
  targetType: string,
  targetId: number,
  type: string
) {
  const response = await axios.delete("/api/reactions", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      targetId: targetId,
      targetType: targetType,
      type: type,
    },
  });
  
  return response;
}