import axios from "axios";

/**
 * @Description 사용자 친구 추가
 * @author 김영서
 **/
export async function usePostFriend(
  accessToken: string | undefined,
  targetUserId: number
) {
  const response = await axios.post(
    "/api/friends",
    {
      targetUserId: targetUserId,
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
 * @Description 사용자 친구 삭제
 * @author 김영서
 **/
export async function useDeleteFriend(
  accessToken: string | undefined,
  targetUserId: number
) {
  const response = await axios.delete("/api/friends", {
    params: {
      targetUserId: targetUserId,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}
