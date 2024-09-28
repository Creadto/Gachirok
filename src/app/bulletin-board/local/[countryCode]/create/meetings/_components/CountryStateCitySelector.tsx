import { CityList } from "@/core/data/CityList";
import { CountryList } from "@/core/data/CountryList";
import { StateList } from "@/core/data/StateList";
import {
  getCityFullName,
  getStateKoreanName,
} from "@/core/utils/handleCountryStateCityModify";
import { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface CountryStateCitySelectorProps {
  selectedCountry: string;
  selectedState: string;
  selectedCity: string;
  setSelectedCountry: (value: string) => void;
  setSelectedState: (value: string) => void;
  setSelectedCity: (value: string) => void;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

/**
 * @Description Country, State, City를 선택할 수 있는 DropdownMenu
 * @author 김영서
 **/
const CountryStateCitySelector = ({
  selectedCountry,
  selectedState,
  selectedCity,
  setSelectedCountry,
  setSelectedState,
  setSelectedCity,
  register, errors
}: CountryStateCitySelectorProps) => {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isStateDropdownVisible, setIsStateDropdownVisible] = useState(true);
  const [isCityDropdownVisible, setIsCityDropdownVisible] = useState(true);

  //Country에 대한 목록 생성
  const countries = Object.entries(CountryList);
  //국가코드에 해당하는 State들 생성
  const filteredState = StateList.filter(
    (state) => state.countryCode === selectedCountry
  );
  //StateCode에 해당하는 City들 생성
  const filteredCity = CityList.filter(
    (city) => city.stateCode === selectedState
  );

  //Country를 선택하는 DropdownMenu 열림 여부 관리
  const toggleCountryDropdown = () => {
    setIsCountryDropdownOpen((prev) => !prev);
    setIsStateDropdownOpen(false);
  };
//State를 선택하는 DropdownMenu 열림 여부 관리
  const toggleStateDropdown = () => {
    setIsStateDropdownOpen((prev) => !prev);
    setIsCityDropdownOpen(false);
  };
//City를 선택하는 DropdownMenu 열림 여부 관리
  const toggleCityDropdown = () => {
    console.log("activated");
    setIsCityDropdownOpen((prev) => !prev);
  };

  // State, City를 초기화시키고, Country Dropdown닫고 State Dropdown 열기
  const handleCountrySelect = (country: string) => {
    setSelectedState("");
    setSelectedCity("");
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
    setIsStateDropdownOpen(true);
  };
  // City를 초기화시키고, State Dropdown 닫고 City Dropdown 열기
  //State에 'ALL'이 포함되어 있으면(전체) City 항목 안보이게 설정
  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    setSelectedCity("");
    setIsStateDropdownOpen(false);
    state.includes("All")
      ? setIsCityDropdownVisible(false)
      : setIsCityDropdownVisible(true);
    setIsCityDropdownOpen(true);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsCityDropdownOpen(false);
  };

  //필터된 State와 City가 0이면(존재하지 않으면) 해당 항목 안보이게 설정
  useEffect(() => {
    filteredState.length === 0
      ? setIsStateDropdownVisible(false)
      : setIsStateDropdownVisible(true);
    filteredCity.length === 0
      ? setIsCityDropdownVisible(false)
      : setIsCityDropdownVisible(true);
  }, [filteredState, filteredCity]);

  return (
    <div className="flex flex-wrap space-x-4">
      {/* Country 버튼 */}
      <div className="relative">
        <button
        type="button"
          onClick={toggleCountryDropdown}
          className={`w-48 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md text-left h-[48px] ${
            errors.residenceCountryCode ? "border-red-500" : ""
          }`}
          {...register("residenceCountryCode", { required: true })}
        >
          {selectedCountry
            ? CountryList[selectedCountry]
            : "국가를 선택해주세요"}
        </button>
        {errors.residenceCountryCode && (
          <span className="text-red-500 text-sm">국가 선택은 필수 항목입니다.</span>
        )}
        {/* Country Dropdown */}
        {isCountryDropdownOpen && (
          <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {countries.map(([code, name]) => (
              <button
                key={code}
                onClick={() => handleCountrySelect(code)}
                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition-colors duration-150"
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* State 버튼 */}
      {selectedCountry && isStateDropdownVisible && (
        <div className="relative">
          <button
          type="button"
            onClick={toggleStateDropdown}
            className={`w-48 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md text-left h-[48px] ${
              errors.residenceStateCode ? "border-red-500" : ""
            }`}
            {...register("residenceStateCode", { required: true})}
          >
            {selectedState
              ? getStateKoreanName(selectedState)
              : "구/도를 선택해주세요"}
          </button>
          {errors.residenceStateCode && (
            <span className="text-red-500 text-sm">구/도는 필수항목입니다.</span>
          )}
          {/* State Dropdown */}
          {isStateDropdownOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredState.map((state) => (
                <button
                  key={state.id}
                  onClick={() => handleStateSelect(state.stateCode)}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition-colors duration-150"
                >
                  {state.koreanName}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* City 버튼 */}
      {selectedState && isCityDropdownVisible && (
        <div className="relative">
          <button
          type="button"
            onClick={toggleCityDropdown}
            className={`w-48 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md text-left h-[48px] ${
              errors.residenceCityCode ? "border-red-500" : ""
            }`}
            {...register("residenceCityCode", { required:true})}
          >
            {selectedCity ? getCityFullName(selectedCity) : "시를 선택해주세요"}
          </button>
          {errors.residenceCityCode && (
            <span className="text-red-500 text-sm">시는 필수항목입니다.</span>
          )}
          {/* City Dropdown */}
          {isCityDropdownOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredCity.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleCitySelect(city.name)}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition-colors duration-150"
                >
                  {city.fullName}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CountryStateCitySelector;
