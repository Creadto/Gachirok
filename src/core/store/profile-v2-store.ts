import { ProfileResponse } from "@/app/profile/_types/ProfileResponse";
import { PurchaseProfileResponse } from "@/app/profile/_types/PurchaseProfileResponse";
import { create } from "zustand";


interface profileState {
  profile: ProfileResponse | null;
}

interface profileActions {
  setProfile: (profile: ProfileResponse | null) => void;
}
/**
 * @Description Profile에 대한 정보를 저장하는 전역 store
 * @author 김영서
 **/
const useProfileStore2 = create<profileState & profileActions>((set) => ({
  profile: null,
  setProfile: (profile: ProfileResponse | null) => set({ profile: profile }),
}));

export default useProfileStore2;
