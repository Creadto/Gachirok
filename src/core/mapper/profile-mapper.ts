import { ProfileCreateRequest } from "@/app/profile/_types/ProfileCreateRequest";
import { Profile } from "../store/profile-store";
import { ProfileResponse } from "@/app/profile/_types/ProfileResponse";
import { ProfileVisitResponse } from "@/app/profile/_types/ProfileVisitResponse";


//Profile에서 ProfileCreateRequest 데이터 추출하기
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

//Profile에 ProfileResponse데이터 넣기
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
//Profile에 ProfileVisitResponse데이터 넣기
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
