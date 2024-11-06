import axios from "axios";

/**
 * @Description Google Map AutoComplete 조회
 * @author 김영서
 **/
export async function useHandleAutoComplete(
  input: string | undefined,
  sessionToken: string
) {
  const response = await axios.post(
    "https://places.googleapis.com/v1/places:autocomplete",
    {
      input: input,
      languageCode: "ko",
      sessionToken: sessionToken,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": "AIzaSyAzYo6DLiwFaBruEFr5auYA95XFb4SsIwY",
      },
    }
  );

  return response;
}

/**
 * @Description 선택한 위치의 위도, 경도 조회
 * @author 김영서
 **/
export async function useHandlePlaceDetail(placeId: string) {
  const response = await axios.get(
    `https://places.googleapis.com/v1/places/${placeId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": "AIzaSyAzYo6DLiwFaBruEFr5auYA95XFb4SsIwY",
        "X-Goog-FieldMask": "location",
      },
    }
  );

  return response;
}

/**
 * @Description Reverse Geocoding을 통해 지도에 그릴 정보 조회
 * @author 김영서
 **/
export async function useHandleReverseGeocoding(lat: string, lng: string) {
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json",
    {
      params: {
        latlng: `${lat}, ${lng}`,
        key: "AIzaSyBpt69IUksWPXIjCaPwu43Kd33SC8hLtzM",
        language: "ko",
      },
    }
  );

  return response;
}
