import axios from "axios";

/**
 * @Description meetingId를 바탕으로 즐겨찾기 추가/해제
 * @author 김영서
 **/
export async function usePostMeetingsBookmark(
  accessToken: string,
  meetingId: number
) {
  const response = await axios.post(
    `/api/meetings/${meetingId}/bookmark`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
}
