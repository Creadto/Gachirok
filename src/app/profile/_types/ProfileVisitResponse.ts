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