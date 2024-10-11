export interface MeetingCreateRequest {
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
    meetingStartTime: string
    meetingEndTime: string;
    sexType: string;
    hostType: string;
    meetingType: string;

    content: boolean;
    hostTip: boolean;
    rental: boolean;
    material: boolean
    snack: boolean
    admission: boolean
    entry: boolean
    customCostDescription: string;

    interests: string[];
    photos: File[] | null; //MultipartFile

    coin: number;
    packageItem: string;
  }