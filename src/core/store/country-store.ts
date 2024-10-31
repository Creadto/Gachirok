import { create } from 'zustand';
import { getCountryName } from '../utils/handleCountryStateCityModify';
import {createJSONStorage, persist} from "zustand/middleware";

interface countryStore{
    country: string;
    countryName: string,
    setCountry: (country:string)=>void;
}

/**
 * @Description 국가선택에 관한 결과값을 주소값에 할당  / 반대로도 적용해서 교차검증하는 store
 * @author 김영서
 **/
export const countryStore = create<countryStore>()(
    persist(
        (set) => ({
            country: "KR", // 기본값
            countryName: "대한민국", // 기본 국가 이름
            setCountry: (country) =>
                set({ country: country.toUpperCase(), countryName: getCountryName(country) }),
        }),
        {
            name: "country-store", // 로컬 스토리지 키 이름
            storage: createJSONStorage(() => localStorage), // 로컬 스토리지에 저장
        }
    )
);