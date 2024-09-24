import { create } from "zustand";
import { Profile } from "../types/Profile";

interface profileState {
  profile: Profile;
}

interface profileActions {
  setProfile: (profile: Profile) => void;
}

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
