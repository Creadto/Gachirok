//사용자 조회를 통해 받은 api 결과를 전역변수로 저장하는 store

// import { create } from 'zustand';
// import { UserResponse } from '../types/UserResponse';

// interface userResponseState {
//   userResponse: UserResponse | null;
// }

// interface userResponseActions {
//   setUserResponse: (userResponse: UserResponse) => void;
// }

// const useUserResponseStore = create<userResponseState & userResponseActions>((set) => ({
//     userResponse: null,
//     setUserResponse: (userResponse: UserResponse) => set({ userResponse: userResponse }),
// }));

// export default useUserResponseStore;


//사용자 조회를 통해 받은 api 결과를 전역변수로 저장하는 store

import { create } from 'zustand';
import { User } from '../types/User';

interface userState {
  user: User | null;
}

interface userActions {
  setUser: (user: User) => void;
}

const useUserStore = create<userState & userActions>((set) => ({
    user: {
      userId: '',
      platform: '',
      email: '',
      referralCode: '',
      profile: null
    },
    setUser: (user: User) => set({ user: user }),
}));

export default useUserStore;

