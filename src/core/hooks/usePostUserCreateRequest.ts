import axios from "axios";

/**
 * @Description 약관동의 시 UserCreateRequest를 API에게 보내는 함수
 * @author 김영서
 **/
export async function usePostUserCreateRequest(
  accessToken: string,
  noticeMarketing: Boolean
) {
  const response = await axios.post(
    "/api/users",

    {
      deviceToken: Math.floor(Math.random() * 1000).toString(),
      countryCode: "China",
      noticeMarketing: noticeMarketing
    },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );

  return response;
}
