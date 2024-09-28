
//사용자 조회를 통해 받은 api 결과를 전역변수로 저장하는 store

import { create } from 'zustand';
import { Profile } from './profile-store';

export interface User{
  signedUpUser: boolean,
  userId: string,
  platform: string,
  email: string,
  referralCode: string,
  profile: Profile | null
}



interface userState {
  user: User;
}

interface userActions {
  setUser: (user: User) => void;
}

/**
 * @Description User에 대한 정보를 저장하는 전역 store
 * @author 김영서
 **/
const useUserStore = create<userState & userActions>((set) => ({
    user: {
      signedUpUser: false,
      userId: '',
      platform: '',
      email: '',
      referralCode: '',
      profile: null
    },
    setUser: (user: User) => set({ user: user }),
}));

export default useUserStore;

