import { create } from "zustand";

interface editButtonState {
  active: boolean;
}

interface editButtonAction {
  setActive: (active: boolean) => void;
}


/**
 * @Description Topbar의 EditButton에 대한 상태관리 전역 store 
 * @author 김영서
 **/
const useEditButtonStore = create<editButtonState & editButtonAction>(
  (set) => ({
    active: false,
    setActive: (active: boolean) => set({ active: active }),
  })
);

export default useEditButtonStore;
