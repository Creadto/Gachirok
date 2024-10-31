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
  const response = await axios.post(
    "/api/posts",
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
}
