import { PostCreateRequest } from "@/app/bulletin-board/local/[countryCode]/create/_types/PostCreateRequest";
import axios from "axios";

/**
 * @Description 게시글을 생성
 * @author 김영서
 **/
export async function usePostCreatePost(
  accessToken: string | undefined,
  data: PostCreateRequest
) {
  const response = await axios.post("/api/posts", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
}

/**
 * @Description 게시글 리액션 생성
 * @author 김영서
 **/
export async function usePostPostReactions(
  accessToken: string | undefined,
  targetType: string,
  targetId: number,
  type: string
) {
  const response = await axios.post(
    "/api/reactions",
    {
      targetId: targetId,
      targetType: targetType,
      type: type,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
}
