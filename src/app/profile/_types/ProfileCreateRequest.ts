export interface ProfileCreateRequest {
    male: boolean;
    traveler: boolean;
    residenceYear: number;
    birth: string;
    nickname: string;
    residenceCountryCode: string;
    residenceStateCode: string;
    residenceCityCode: string;
    introduction: string;
    photo: File | null; //MultipartFile
    interests: string[];
    expertises: string[];
  }