import { PurchaseProfileResponse } from "@/app/profile/_types/PurchaseProfileResponse";
import { create } from "zustand";


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


interface profileState {
  profile: Profile;
}

interface profileActions {
  setProfile: (profile: Profile) => void;
}
/**
 * @Description Profile에 대한 정보를 저장하는 전역 store
 * @author 김영서
 **/
const useProfileStore = create<profileState & profileActions>((set) => ({
  profile: {
    male: true,
    traveler: true,
    age: 1,
    residenceYear: 0,
    hostValue: 0,
    guestValue: 0,
    knowledgeValue: 0,
    profilePhotoUrl: "",
    photo: null,
    nickname: "",
    residenceCountryCode: "",
    residenceStateCode: "",
    residenceCityCode: "",
    introduction: "",
    birth: "",
    interests: [],
    expertises: [],
    blockUser: false,
    guestMeetingOpen: false,
    answerCount: 0,
    answerPoint: 0,
    answerSpeed: 0,
    purchaseProfile: null,
  },
  setProfile: (profile: Profile) => set({ profile: profile }),
}));

export default useProfileStore;
