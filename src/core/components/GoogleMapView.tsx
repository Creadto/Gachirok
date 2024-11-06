import {
  GoogleMap,
  InfoWindow,
  Marker
} from "@react-google-maps/api";
import { useState } from "react";
import { useHandleReverseGeocoding } from "../utils/handleLocation";


interface GoogleMapViewProps {
  location: Location
setLocation: (value: any) => void;
}
export const GoogleMapView = ({setLocation, location}:GoogleMapViewProps) => {

  const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "8px",
  };
  
  //지도 Marker 클릭 여부
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

  //지도의 마커를 드래그 하였을 때
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

  

  return(
    <GoogleMap
    mapContainerStyle={containerStyle}
    center={{
      lat: location.geometry.location.lat,
      lng: location.geometry.location.lng,
    }}
    zoom={15}
  >
    <Marker
      position={{
        lat: location.geometry.location.lat,
        lng: location.geometry.location.lng,
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
  )
}