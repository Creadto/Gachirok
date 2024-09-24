export interface Profile {
  male: boolean;
  traveler: boolean;
  age: number;
  residenceYear: number;
  hostValue: number;
  guestValue: number;
  knowledgeValue: number;
  profilePhotoUrl: string;
  photo: File | null; //MultipartFile
  nickname: string;
  residenceCountryCode: string;
  residenceStateCode: string;
  residenceCityCode: string;
  introduction: string;
  birth: string;
  interests: string[];
  expertises: string[];
  blockUser: boolean;
  guestMeetingOpen: boolean;
  answerCount: number;
  answerPoint: number;
  answerSpeed: number;
  purchaseProfile: PurchaseProfileResponse  | null;
}

export interface ProfileResponse {
  male: boolean;
  traveler: boolean;
  age: number;
  residenceYear: number;
  hostValue: number;
  guestValue: number;
  knowledgeValue: number;
  profilePhotoUrl: string;
  nickname: string;
  residenceCountryCode: string;
  residenceStateCode: string;
  residenceCityCode: string;
  introduction: string;
  birth: string;
  interests: string[];
  expertises: string[];

  purchaseProfile: PurchaseProfileResponse;
}

export interface PurchaseProfileResponse {
  freeHosting: boolean;
  coin: number;
  purchaseItem: PurchaseItemResponse;
}

export interface PurchaseItemResponse {
  all: null | string;
  allExpirationDateTime: null | string;
  guest: null | string;
  guestExpirationDateTime: null | string;
  inquiry: null | string;
  inquiryExpirationDateTime: null | string;
  hosting: null | string;
  hostingExpirationDateTime: null | string;
}

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

export interface ProfileVisitResponse {
  blockUser: boolean;
  guestMeetingOpen: boolean;
  traveler: boolean;
  age: number;
  residenceYear: number;
  answerCount: number;
  answerPoint: number;
  answerSpeed: number;
  hostValue: number;
  guestValue: number;
  knowledgeValue: number;
  profilePhotoUrl: string;
  nickname: string;
  residenceCountryCode: string;
  residenceStateCode: string;
  residenceCityCode: string;
  introduction: string;
  birth: string;
  interests: string[];
  expertises: string[];
}

export interface ProfileUpdateRequest{
    //UI에서 변경된 값을 바탕으로 사용자 정보를 수정했을 때 필요한 type
      traveler: boolean,
      residenceYear: number
      nickname: string,
      residenceCountryCode: string,
      residenceStateCode: string,
      residenceCityCode: string,
      introduction: string,
      photo: File,
      interests: string[],
      expertises: string[]
      
    }