export interface PostCreateRequest {
  region: {
    countryCode: string;
    stateCode: string;
    cityCode: string;
  };
  category: string;
  title: string;
  content: string;
  thumbnailPhotoUrl?: string;
  place?: {
    formattedAddress: string;
    detail: string;
    latitude: number;
    longitude: number;
  };
}