import { MeetingUpdateRequest } from "@/app/bulletin-board/local/[countryCode]/create/meetings/_types/MeetingUpdateRequest";
import axios from "axios";

/**
 * @Description 모임의 다른 회원에게 방장 권한 위임
 * @author 김영서
 **/
export async function usePutMeetingNewHost(
  accessToken: string | undefined,
  newHostId: number,
  meetingId: number
) {
  const response = await axios.put(
    `/api/meetings/${meetingId}/hosts/${newHostId}`,
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
 * @Description 모임의 호스트가 모임을 나가기
 * @author 김영서
 **/
export async function usePutMeetingLeave(
  accessToken: string | undefined,
  meetingId: number
) {
  const response = await axios.put(
    `/api/meetings/${meetingId}/hosts/leave`,
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
 * @Description 모임을 수정
 * @author 김영서
 **/
export async function usePutMeetingEdit(
  accessToken: string | undefined,
  meetingId: number,
  data: MeetingUpdateRequest
) {
  const response = await axios.put(
    `/api/meetings2/${meetingId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response;
}

