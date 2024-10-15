import { MemberPreviewResponse } from "./MemberPreviewResponse";

export interface MeetingPreviewResponse {
  meetingId: number;
  bookmark: boolean;
  reviewStatus: boolean; // 리뷰 필요 : 모임종료 & 모임멤버 & 리뷰미실시
  finished: boolean;
  coin: number;
  maxMember: number;
  title: string;
  countryCode: string;
  countryFlagEmoji: string;
  stateCode: string;
  cityCode: string;
  location: string;
  meetingPhotoUrl: string;
  meetingDate: string; // MM/dd (E)
  meetingStartTime: string; // HH:mm
  sexType: 'anyone' | 'same_sex' | 'female' | 'male'; // 성별 타입
  meetingType: 'ONCE' | 'ALWAYS'; // 모임 타입
  interests: string[]; // 문화, 활동, 음식, 자기계발, 친목, 봉사, 로컬 등 관심사 목록
  members: MemberPreviewResponse[];
}