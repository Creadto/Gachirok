import axios from "axios";

/**
 * @Description ProfileResponse를  API로부터 Post하는 함수
 * @author 김영서
 **/
export default async function usePostProfileResponse(accessToken: string) {
        const response = await axios.get("/api/profiles", {
          headers: {
            Authorization: accessToken,
          },
      })

      return response;
  };
