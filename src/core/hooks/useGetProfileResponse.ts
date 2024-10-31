import axios from "axios";


/**
 * @Description ProfileResponse를  API로부터 Get하는 함수
 * @author 김영서
 **/
export async function useGetProfileResponse(accessToken: string|undefined) {
  const response = await axios.get("/api/profiles", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}

/**
 * @Description 사용자 ID를 바탕으로 ProfileResponse를  API로부터 Get하는 함수
 * @author 김영서
 **/
export async function useGetTargetUserProfile(accessToken: string | undefined, userId: number) {
  const response = await axios.get(`/api/profiles2/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}