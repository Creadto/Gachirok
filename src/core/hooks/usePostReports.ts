import axios from "axios";

/**
 * @Description 신고 등록(POST, MEETING, USER 총괄)
 * @author 김영서
 **/
export async function usePostReports(
  targetType: string,
  targetId: number,
  type: string,
  content: string,
  photoUrls: string[],
  accessToken: string | undefined
) {
  const response = await axios.post(
    `/api/reports`,
    {
      targetType: targetType,
      targetId: targetId,
      type: type,
      content: content,
      photoUrls: photoUrls,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
}
