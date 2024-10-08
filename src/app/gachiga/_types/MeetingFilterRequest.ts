export interface MeetingFilterRequest {
  approval?: boolean;
  costly?: boolean;
  slot?: number;
  startAge?: number;
  endAge?: number;
  meetingStartDate?: string; // y년 M월 d일
  meetingEndDate?: string;
  meetingStartTime?: string; // H시 m분
  meetingEndTime?: string;
  countryCode?: string;
  stateCode?: string;
  cityCode?: string;
  sexType?: 'anyone' | 'same_sex' | 'female' | 'male';
  title?: string;
  introduction?: string;
  daysOfWeek?: number[]; // 일요일: 1, 월요일: 2, ..., 토요일: 7
  interests?: string[];
}