import { ProfileCreateRequest } from "@/app/profile/_types/ProfileCreateRequest";
import { Profile } from "../store/profile-store";
import { ProfileResponse } from "@/app/profile/_types/ProfileResponse";
import { ProfileVisitResponse } from "@/app/profile/_types/ProfileVisitResponse";
import { ProfileUI } from "@/app/profile/_types/ProfileUI";
import { ProfileUpdateRequest } from "@/app/profile/_types/ProfileUpdateRequest";

/**
 * @Description Profile에서 ProfileCreateRequest 타입에 맞게 데이터 추출하기
 * @author 김영서
 **/
export function mapProfileCreateRequest(data: Profile): ProfileCreateRequest {
  return {
    male: data.male,
    traveler: data.traveler,
    residenceYear: data.residenceYear,
    birth: data.birth,
    nickname: data.nickname,
    residenceCountryCode: data.residenceCountryCode,
    residenceStateCode: data.residenceStateCode,
    residenceCityCode: data.residenceCityCode,
    introduction: data.introduction,
    photo: data.photo || null,
    interests: data.interests,
    expertises: data.expertises,
  };
}

/**
 * @Description ProfileUI에서 변동된 값들을 ProfileUpdateRequest으로 mapping하는 함수
 * @author 김영서
 **/
export function mapProfileUpdateRequest(profileUI: ProfileUI, selectedFile: File): ProfileUpdateRequest {
  return {
    traveler: profileUI.traveler,
    residenceYear: profileUI.residenceYear,
    nickname: profileUI.nickname,
    residenceCountryCode: profileUI.residenceCountryCode,
    residenceStateCode: profileUI.residenceStateCode,
    residenceCityCode: profileUI.residenceCityCode,
    introduction: profileUI.introduction,
    photo: selectedFile,
    interests: profileUI.interests,
    expertises: profileUI.expertises,

  };
}

/**
 * @Description ProfileResponse결과를 ProfileUI 타입에 넣는 함수
 * @author 김영서
 **/
export function mapProfileUI(dataFromAPI: ProfileResponse): ProfileUI {
  return {
    traveler: dataFromAPI.traveler,
    residenceYear: dataFromAPI.residenceYear,
    nickname: dataFromAPI.nickname,
    residenceCountryCode: dataFromAPI.residenceCountryCode,
    residenceStateCode: dataFromAPI.residenceStateCode,
    residenceCityCode: dataFromAPI.residenceCityCode,
    introduction: dataFromAPI.introduction,
    photo: dataFromAPI.profilePhotoUrl,
    interests: dataFromAPI.interests,
    expertises: dataFromAPI.expertises,
  };
}

/**
 * @Description Profile에 ProfileResponse 데이터 넣기
 * @author 김영서
 **/
export function mapProfileResponse(
  data: ProfileResponse,
  profile: Profile
): Profile {
  return {
    ...profile,
    male: data.male,
    traveler: data.traveler,
    age: data.age,
    residenceYear: data.residenceYear,
    hostValue: data.hostValue,
    guestValue: data.guestValue,
    knowledgeValue: data.knowledgeValue,
    profilePhotoUrl: data.profilePhotoUrl,
    nickname: data.nickname,
    residenceCountryCode: data.residenceCountryCode,
    residenceStateCode: data.residenceStateCode,
    residenceCityCode: data.residenceCityCode,
    introduction: data.introduction,
    birth: data.birth,
    interests: data.interests,
    expertises: data.expertises,
    purchaseProfile: data.purchaseProfile,
  };
}
/**
 * @Description Profile에 ProfileVisitResponse 데이터 넣기
 * @author 김영서
 **/
export function mapProfileVisitResponse(
  data: ProfileVisitResponse,
  profile: Profile
): Profile {
  return {
    ...profile,
    blockUser: data.blockUser,
    guestMeetingOpen: data.guestMeetingOpen,
    traveler: data.traveler,
    age: data.age,
    residenceYear: data.residenceYear,
    answerCount: data.answerCount,
    answerPoint: data.answerPoint,
    answerSpeed: data.answerSpeed,
    hostValue: data.hostValue,
    guestValue: data.guestValue,
    knowledgeValue: data.knowledgeValue,
    profilePhotoUrl: data.profilePhotoUrl,
    nickname: data.nickname,
    residenceCountryCode: data.residenceCountryCode,
    residenceStateCode: data.residenceStateCode,
    residenceCityCode: data.residenceCityCode,
    introduction: data.introduction,
    birth: data.birth,
    interests: data.interests,
    expertises: data.expertises,
  };
}
