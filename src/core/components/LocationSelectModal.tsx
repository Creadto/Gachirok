import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  useHandleAutoComplete,
  useHandlePlaceDetail,
  useHandleReverseGeocoding,
} from "../utils/handleLocation";
import CloseIcon from "./icons/CloseIcon";
import SearchIcon from "./icons/top-bar/SearchIcon";
import {
  GoogleMap,
  Marker,
  LoadScript,
  InfoWindow,
} from "@react-google-maps/api";

interface LocationSelectModalProps {
  setIsLocationModlOpen: (value: boolean) => void;
  setLocationResult: (value: string) => void;
}

export const LocationSelectModal = ({
  setIsLocationModlOpen,
  setLocationResult,
}: LocationSelectModalProps) => {
  const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "8px",
  };

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

  //전달해야하는 주소 결과값
  const [formattedAddress, setFormattedAddress] = useState(null);

  //지도 Marker 클릭 여부
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

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
  // 사용자가 장소를 선택했을 때 세션을 리셋
  const handlePlaceSelect = async (id: string, text: string | undefined) => {
    setPlaceInput(text);
    console.log(text);
    setPlaceId(id);
    setSessionToken(uuidv4());
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
        "Error fetching place details or reverse geocoding:",
        error
      );
    }
  };

  const handleMarkerDragEnd = async (event: google.maps.MapMouseEvent) => {
    const newLat = event.latLng?.lat();
    const newLng = event.latLng?.lng();

    if (newLat && newLng) {
      setLocation((prevLocation: Location) => ({
        ...prevLocation,
        geometry: {
          ...prevLocation.geometry,
          location: {
            lat: newLat,
            lng: newLng,
          },
        },
      }));
      try {
        const reverseGeoResponse = await useHandleReverseGeocoding(
          newLat.toString(),
          newLng.toString()
        );
        if (reverseGeoResponse) {
          setLocation(reverseGeoResponse.data.results[0]);
          console.log(reverseGeoResponse.data.results[0]);
        }
      } catch (error) {
        console.log(error);
      }

      console.log("Marker dragged to: ", newLat, newLng);
    }
  };

  const handleCloseModal = () => {
    setIsLocationModlOpen(false);
    setIsInfoWindowOpen(false); // Close InfoWindow when modal is closed
    setLocation(null); // Clear the location when modal is closed
  };
  const handleSubmitButton = () => {
    setIsLocationModlOpen(false);
    setLocationResult(location.formatted_address)
  }


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
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={{
                    lat: parseFloat(location.geometry.location.lat),
                    lng: parseFloat(location.geometry.location.lng),
                  }}
                  zoom={15}
                >
                  <Marker
                    position={{
                      lat: parseFloat(location.geometry.location.lat),
                      lng: parseFloat(location.geometry.location.lng),
                    }}
                    title={location.formatted_address}
                    draggable={true}
                    onDragEnd={handleMarkerDragEnd}
                    icon={{
                      url: "/images/icons/location-pin.png",
                    }}
                    onClick={() => setIsInfoWindowOpen((prev) => !prev)}
                  />
                  {isInfoWindowOpen && (
                    <InfoWindow
                      position={{
                        lat: location.geometry.location.lat + 0.0002,
                        lng: location.geometry.location.lng,
                      }}
                      options={{
                        pixelOffset: new google.maps.Size(0, -45),
                      }}
                    >
                      <p className="font-semibold text-sm">
                        핀을 움직여 원하시는 위치를 설정하세요.
                      </p>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </LoadScript>
            ) : (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{
                  lat: parseFloat(location.geometry.location.lat),
                  lng: parseFloat(location.geometry.location.lng),
                }}
                zoom={15}
                onUnmount={() => {
                  setIsInfoWindowOpen(false);
                  setLocation(null); // Clear location on unmount
                }}
              >
                <Marker
                  position={{
                    lat: parseFloat(location.geometry.location.lat),
                    lng: parseFloat(location.geometry.location.lng),
                  }}
                  title={location.formatted_address}
                  draggable={true}
                  onDragEnd={handleMarkerDragEnd}
                  icon={{
                    url: "/images/icons/location-pin.png",
                  }}
                  onClick={() => setIsInfoWindowOpen((prev) => !prev)}
                />
                {isInfoWindowOpen && (
                  <InfoWindow
                    position={{
                      lat: location.geometry.location.lat + 0.0002,
                      lng: location.geometry.location.lng,
                    }}
                    options={{
                      pixelOffset: new google.maps.Size(0, -45),
                    }}
                    onCloseClick={() => setIsInfoWindowOpen(false)}
                  >
                    <p className="font-semibold text-sm">
                      핀을 움직여 원하시는 위치를 설정하세요.
                    </p>
                  </InfoWindow>
                )}
              </GoogleMap>
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
