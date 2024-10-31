import axios from "axios";

/**
 * @Description 방장의 경우 모임 폐쇄
 * @author 김영서
 **/
export async function useDeleteMeetings(
  accessToken: string | undefined,
  meetingId: number
) {
  const response = await axios.delete(`/api/meetings/${meetingId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}
