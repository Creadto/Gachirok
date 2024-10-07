import { create } from 'zustand';
import { getCountryName } from '../utils/handleCountryStateCityModify';
import {persist} from "zustand/middleware";


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
        (set)=>({
            country: "KR", //hompage의 기본값 URL은 KR
            countryName: "대한민국", //homepage의 현재 국가 기본값은 대한민국
            //국가코드는 대문자로 저장, 국가코드에 일치하는 국가 이름을 countryName으로 저장
            setCountry: (country)=>set({country: country.toUpperCase(), countryName: getCountryName(country)}),
        }),
        {
            name: 'country-storage',
        }
    )
);