import { PurchaseProfileResponse } from "./PurchaseProfileResponse";

// export interface ProfileResponse{
//     male: boolean;
//     traveler: boolean;
//     age: number;
//     residenceYear: number;
//     hostValue: number;
//     guestValue: number;
//     knowledgeValue: number;
//     profilePhotoUrl: string;
//     nickname: string;
//     residenceCountryCode: string;
//     residenceStateCode: string;
//     residenceCityCode: string;
//     introduction: string;
//     birth: string;
//     interests: string[];
//     expertises: string[];
//     purchaseProfile: PurchaseProfileResponse;
// }

export interface ProfileResponse{
    userId: number; // 사용자 ID
    nickname: string; // 닉네임
    traveler: boolean; // 여행자 여부
    coin: number,
    residenceCountryCode: string; // 국가 코드
    residenceYear: number; // 거주 년수
    introduction: string; // 소개
    interests: string[]; // 관심분야 종류
    expertises: string[]; // 전문가 분야 종류
    hostValue: number; // 호스트 평가 점수
    guestValue: number; // 게스트 평가 점수
    knowledgeValue: number; // 지식 평가 점수
    profilePhotoUrl: string; // 프로필 사진 URL
    backgroundPhotoUrl: string; // 배경 사진 URL
    badges?: Badge[]; // 활동 뱃지
}


export interface Badge {
    badge: string; // 뱃지 종류
    level: number; // 뱃지 레벨
  }