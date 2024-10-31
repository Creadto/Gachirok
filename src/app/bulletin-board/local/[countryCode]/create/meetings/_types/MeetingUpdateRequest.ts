export interface MeetingUpdateRequest {
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
  meetingDate: string;
  meetingStartTime: string;
  meetingEndTime: string;
  sexType: "anyone" | "same_sex" | "female" | "male"; // Enum으로 타입 지정
  hostType: "normal_host" | "super_host" | "hero_host"; // Enum으로 타입 지정
  meetingType: "ONCE" | "ALWAYS"; // Enum으로 타입 지정

  content: boolean;
  hostTip: boolean;
  rental: boolean;
  material: boolean;
  snack: boolean;
  admission: boolean;
  entry: boolean;
  customCostDescription: string;

  interests: string[];
  photos: string[];
}
