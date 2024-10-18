import axios from "axios";


/**
 * @Description ProfileResponse를  API로부터 Get하는 함수
 * @author 김영서
 **/
export async function useGetMeetings(accessToken: string, countryCode: string, page: number, size: number) {
  const response = await axios.get(`/api/meetings/?countryCode=${countryCode}&page=${page}&size=${size}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

export async function useGetMyMeetings(accessToken: string) {
  const response = await axios.get("/api/meetings/host", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

export async function useGetFilteredMeetings(accessToken: string, url: string, page: number, size: number){
  const response = await axios.get(`/api/meetings/?${url}&page=${page}&size=${size}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}