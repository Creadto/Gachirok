import axios from "axios";

/**
 * @Description 사용자를 모임에서 참가 취소
 * @author 김영서
 **/
export async function useDeleteGuestFromemMeeting(
  accessToken: string | undefined,
  meetingId: number
) {
  const response = await axios.delete(`/api/meetings/${meetingId}/guests`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}

/**
 * @Description 호스트의 승인 수락 전 모임 참가 요청 취소
 * @author 김영서
 **/
export async function useDeletePreGuestFromMeeting(
  accessToken: string | undefined,
  meetingId: number
) {
  const response = await axios.delete(`/api/meetings/${meetingId}/pre-guests`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}

/**
 *
 * @Description 사용자를 모임에 참가
 * @author 김영서
 **/
export async function usePostGuestCreateRequest(
  accessToken: string | undefined,
  answer: string | null,
  purchasePackage: string,
  needToPay: boolean,
  meetingId: number
) {
  const response = await axios.post(
    `/api/meetings/${meetingId}/guests`,
    {
      answer: answer !== null && answer,
      packageItem: purchasePackage,
      coin: needToPay ? -1 : -0,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response;
}

/**
 *
 * @Description 모임 사용자들(호스트 제외) 조회
 * @author 김영서
 **/
export async function useGuestMemberResponse(
  accessToken: string | undefined,
  meetingId: number
) {
  const response = await axios.get(`/api/meetings/${meetingId}/members`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}

/**
 *
 * @Description 모임에서 특정 사용자 추방
 * @author 김영서
 **/
export async function usePutGuestExile(
  accessToken: string | undefined,
  meetingId: number,
  guestId: number
) {
  const response = await axios.put(
    `/api/meetings/${meetingId}/guests/${guestId}/reject`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response;
}
