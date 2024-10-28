import axios from "axios";

/**
 *
 * @Description 승인제 모임에 참가 신청한 목록 조회
 * @author 김영서
 **/
export async function useGetPreGuestHistoryResponse(
  accessToken: string | undefined,
  meetingId: number
) {
  const response = await axios.get(`/api/meetings/${meetingId}/pre-guests`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}

/**
 * @Description 승인제 모임에 참가한 특정 사용자 수락
 * @author 김영서
 **/
export async function useGetPreGuestAccept(
  accessToken: string | undefined,
  meetingId: number,
  guestId: number
) {
  const response = await axios.put(
    `/api/meetings/${meetingId}/pre-guests/${guestId}/accept`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response;
}


/**
 * @Description 승인제 모임에 참가한 특정 사용자 거절
 * @author 김영서
 **/
export async function useGetPreGuestReject(
  accessToken: string | undefined,
  meetingId: number,
  guestId: number
) {
  const response = await axios.put(
    `/api/meetings/${meetingId}/pre-guests/${guestId}/reject`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response;
}
