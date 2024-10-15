import { CityList } from "../data/CityList";
import { CountryList } from "../data/CountryList";
import { StateList } from "../data/StateList";

/**
 * @Description CountryList에서 국가코드를 바탕으로 국가이름 가져오는 함수
 * @author 김영서
 **/
export function getCountryName(code: string | undefined) {
  const country = CountryList.find((country) => country.code === code);
  return country?.name;
}

/**
 * @Description 국가 이름으로부터 국가 코드를 가져오는 함수
 * @author 김영서
 **/
export function getCountryCode(name: string | undefined){

  const country = CountryList.find((country) => country.name === name);
  return country?.code;

  // const entries = Object.entries(CountryList);
  // for (const [code, countryName] of entries) {
  //   if (countryName === name) {
  //     return code;
  //   }
  // }
  // return undefined; // 국가 이름이 존재하지 않는 경우
}

/**
 * @Description StateList에서 stateCode에 해당하는 한국이름들 가져오는 함수
 * @author 김영서
 **/
export function getStateKoreanName(stateCode: string | undefined) {
  const state = StateList.find((state) => state.stateCode === stateCode);
  return state ? state.koreanName : "구/도를 선택해주세요";
}

/**
 * @Description CityList에서 cityName에 해당하는 fullName가져오는 함수
 * @author 김영서
 **/
export function getCityFullName(cityName: string | undefined) {
  const city = CityList.find((city) => city.cityCode === cityName);
  return city ? city.fullName : "시를 선택해주세요";
}

export function getCityFullNameForProfile(cityCode: string | undefined) {
  const city = CityList.find((city) => city.cityCode === cityCode);
  return city ? city.fullName : "시를 선택해주세요";
}
