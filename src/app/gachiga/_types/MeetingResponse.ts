import { MemberResponse } from "./MemberResponse";

export interface MeetingResponse {
  hostId: number; // Long -> number
  meetingId: number; // Long -> number
  bookmark: boolean;
  reviewStatus: boolean; // 리뷰 필요 : 모임종료 & 모임멤버 & 리뷰미실시
  finished: boolean;
  approval: boolean;
  costly: boolean;
  maxMember: number; 
  startAge: number;
  endAge: number;
  title: string;
  countryCode: string;
  countryFlagEmoji: string;
  stateCode: string;
  cityCode: string;
  location: string;
  question: string;
  introduction: string;
  information: string;
  cost: string; 
  meetingDate: string; // ex) yyyy.MM.dd(E)
  meetingStartTime: string; // ex) HH:mm
  meetingEndTime: string;
  sexType: 'anyone' | 'same_sex' | 'female' | 'male';  
  hostType: 'normal_host' | 'super_host' | 'hero_host';
  hostPhotoUrl: string;
  hostNickname: string;
  hostValue: number; // float -> number
  visitorStatus: 'host' | 'accept' | 'reject' | 'wait' | 'visit' | 'cancel';
  meetingType: 'ONCE' | 'ALWAYS';
  content: boolean;
  hostTip: boolean;
  rental: boolean;
  material: boolean;
  snack: boolean;
  admission: boolean;
  entry: boolean;
  customCostDescription: string;

  interests: string[]
  photoUrls: string[];

  members: MemberResponse[]; 
}