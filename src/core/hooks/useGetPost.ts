import { PostCreateRequest } from "@/app/bulletin-board/local/[countryCode]/create/_types/PostCreateRequest";
import axios from "axios";

/**
 * @Description 게시글 가져오기
 * @author 김영서
 **/
export async function useGetPost(accessToken: string | undefined, url: string, page: number, size: number){
  const response = await axios.get(`/api/posts?${url}&page=${page}&size=${size}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

/**
 * @Description 게시글 가져오기
 * @author 김영서
 **/
export async function useGetPostId(accessToken: string | undefined, postId: number){
  const response = await axios.get(`/api/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}


/**
 * @Description 게시글 답글 가죠오기
 * @author 김영서
 **/
export async function useGetPostIdComments(accessToken: string | undefined, postId: number){
  const response = await axios.get(`/api/posts/${postId}/comments`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}
