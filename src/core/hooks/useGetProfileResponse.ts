import axios from "axios";


/**
 * @Description ProfileResponse를  API로부터 Get하는 함수
 * @author 김영서
 **/
export default async function useGetProfileResponse(accessToken: string) {
  const response = await axios.get("/api/profiles", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}

