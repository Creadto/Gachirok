import axios from "axios";

/**
 * @Description ProfileCreateRequest를 API에 Post하는 함수
 * @author 김영서
 **/
export default async function usePostProfileCreateRequest(
  accessToken: string,
  formData: FormData
) {
  const response = await axios.post("/api/profiles", formData, {
    headers: {
    "Content-Type": "multipart/form-data",
      Authorization: accessToken,
    },
  });

  return response;
}
