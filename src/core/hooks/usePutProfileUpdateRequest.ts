import axios from "axios";

/**
 * @Description ProfileUpdateRequest를 API에 Put하는 함수
 * @author 김영서
 **/
export default async function usePutProfileUpdateRequest(
  accessToken: string,
  formData: FormData
) {
  const response = await axios.put("/api/profiles", formData, {
    headers: {
      Authorization: accessToken,
    },
  });

  return response;
}
  