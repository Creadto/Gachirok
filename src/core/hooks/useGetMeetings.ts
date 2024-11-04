import axios from "axios";


/**
 * @Description 국가별 미팅을 가져오기
 * @author 김영서
 **/
export async function useGetMeetings(accessToken: string, countryCode: string, page: number, size: number) {
  const response = await axios.get(`/api/meetings2/?countryCode=${countryCode}&page=${page}&size=${size}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

/**
 * @Description 내 모임 가져오기
 * @author 김영서
 **/
export async function useGetMyMeetings(accessToken: string) {
  const response = await axios.get("/api/meetings/host", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

/**
 * @Description 조건을 바탕으로 필터링 된 모임 가져오기
 * @author 김영서
 **/
export async function useGetFilteredMeetings(accessToken: string, url: string, page: number, size: number){
  const response = await axios.get(`/api/meetings2/?${url}&page=${page}&size=${size}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

/**
 * @Description 특정 모임의 상세 정보 가져오기
 * @author 김영서
 **/
export async function useGetMeetingsId(meetingId: number,  accessToken: string | undefined) {
  const response = await axios.get(`/api/meetings/${meetingId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response.data;
}