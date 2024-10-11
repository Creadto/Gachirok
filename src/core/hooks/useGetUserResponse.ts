import axios from "axios";

/**
 * @Description UserResponse를 API로부터 Get하는 함수
 * @author 김영서
 **/
export default async function useGetUserResponse(accessToken: string) {
  const response = await axios.get("/api/users", {
    headers: {
      Authorization: accessToken,
    },
  });

  return response;
}
