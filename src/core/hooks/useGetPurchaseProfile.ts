import axios from "axios";

/**
 * @Description 사용자의 Purchase Profile을 가져오는 함수
 * @author 김영서
 **/
export async function useGetPurchaseProfileResponse(accessToken: string | undefined) {
  const response = await axios.get("/api/purchases", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}