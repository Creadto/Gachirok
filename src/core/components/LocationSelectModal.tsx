import { LoadScript } from "@react-google-maps/api";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  useHandleAutoComplete,
  useHandlePlaceDetail,
  useHandleReverseGeocoding,
} from "../utils/handleLocation";
import { GoogleMapView } from "./GoogleMapView";
import CloseIcon from "./icons/CloseIcon";
import SearchIcon from "./icons/top-bar/SearchIcon";

interface LocationSelectModalProps {
  setIsLocationModlOpen: (value: boolean) => void;
  setLocationResult: (value: string) => void;
}

export const LocationSelectModal = ({
  setIsLocationModlOpen,
  setLocationResult,
}: LocationSelectModalProps) => {
  //uuid로 세션 생성
  const [sessionToken, setSessionToken] = useState<string>(uuidv4());

  //입력받는 위치
  const [placeInput, setPlaceInput] = useState<undefined | string>(undefined);

  //자동완성 보기들
  const [placeSuggestion, setPlaceSuggestion] = useState<PlacePrediction[]>([]);

  //자동 완성 보기 가시성 여부
  const [isSearchResultOpen, setIsSearchResultOpen] = useState(false);

  //사용자가 선택한 위치의 placeId
  const [placeId, setPlaceId] = useState<string | null>(null);

  //GeoCoding 결과
  const [location, setLocation] = useState<any>(null);


  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // setPlaceSuggestion([]);

    const input = e.target.value;
    setPlaceInput(input);

    // 입력값이 있을 경우에만 sessionToken을 확인하고 API 호출
    if (input) {
      setIsSearchResultOpen(true);
      if (!sessionToken) {
        setSessionToken(uuidv4());
      }

      // API 호출로 자동완성 결과 가져오기
      try {
        const response = await useHandleAutoComplete(input, sessionToken);
        if (response && response.data && response.data.suggestions) {
          const predictions = response.data.suggestions.map(
            (suggestion: Suggestion) => suggestion.placePrediction
          );
          setPlaceSuggestion(predictions);
        } else {
          setPlaceSuggestion([]);
        }
      } catch (error) {
        setPlaceSuggestion([]);
      }
    }
    if (input === "") {
      setPlaceSuggestion([]);
    }
  };

  //자동 완성 된 위치 선택
  const handlePlaceSelect = async (id: string, text: string | undefined) => {
    setPlaceInput(text);
    console.log(text);
    setPlaceId(id);

    setIsSearchResultOpen(false);
    setPlaceSuggestion([]);
    try {
      const response = await useHandlePlaceDetail(id);
      if (response && response.data) {
        const { latitude, longitude } = response.data.location;

        const reverseGeoResponse = await useHandleReverseGeocoding(
          latitude.toString(),
          longitude.toString()
        );

        if (reverseGeoResponse) {
          console.log(reverseGeoResponse.data.results[0]);
          setLocation(reverseGeoResponse.data.results[0]); // Store the first result
        }
      }
    } catch (error) {
      console.error(
        "Errotching place details or reverse geocoding:",
        error
      );
    }
  };

  //모달 닫힐 때
  const handleCloseModal = () => {
    setIsLocationModlOpen(false);
    setLocation(null); // Clear the location when modal is closed
  };

  //주소 설정 버튼 누를 때
  const handleSubmitButton = () => {
    setIsLocationModlOpen(false);
    setLocationResult(location.formatted_address);
    // setLocationDetailResult()
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-[15px] w-[700px] h-[700px] relative p-[15px]">
        {/* Modal HEADER */}
        <div className="flex flex-row">
          <div className="w-full h-[60px] flex items-start justify-start">
            <span className="font-bold text-lg py-[17px]">위치 설정</span>
          </div>
          <button
            // onClick={() => setIsLocationModlOpen(false)}
            onClick={handleCloseModal}
            className="absolute top-[15px] right-[15px] text-black hover:text-gray-800"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Search Input */}
        <div className="w-[670px]  flex h-[40px] bg-[#F6F6F6] relative border rounded-[5px]">
          <div className="absolute top-[20px] left-[5px]">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="지역, 도로명, 건물명 검색"
            onChange={handleInputChange}
            value={placeInput}
            className="w-full ml-[40px] bg-[#F6F6F6] pl-2 rounded-[5px]"
          />

          {/* 위치 선택지 제시 드롭다운 */}
          {placeSuggestion.length > 0 && isSearchResultOpen && (
            <div className="absolute top-[110%] w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto max-h-[400px] z-50">
              {placeSuggestion?.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handlePlaceSelect(
                      suggestion?.placeId,
                      suggestion?.structuredFormat?.mainText?.text
                    );
                  }}
                >
                  <span className="block font-semibold text-gray-800">
                    {suggestion?.structuredFormat?.mainText?.text}
                  </span>
                  <span className="block text-sm text-gray-600">
                    {suggestion?.text?.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-[20px]">
          {location &&
            (window.google === undefined ? (
              <LoadScript
                googleMapsApiKey="AIzaSyAQcCwjh64dWWAk6o-Nqm5sCIzaOjaPXnI"
                version="beta"
              >
                <GoogleMapView location={location} setLocation={setLocation} />
              </LoadScript>
            ) : (
              <GoogleMapView location={location} setLocation={setLocation} />
            ))}
        </div>
        <div className=" mt-[20px] flex-col w-full">
          <span className="text-lg font-bold block">
            {location ? location.formatted_address : ""}
          </span>

        </div>
        <button
          className="disabled:bg-[#a3a3a3] bg-black  items-center justify-center py-[16px] rounded-lg absolute bottom-[20px] w-[670px]"
          disabled={!location}
          onClick={handleSubmitButton}
        >
          <span className="text-white text-lg">이 위치로 주소 설정</span>
        </button>
      </div>
    </div>
  );
};
