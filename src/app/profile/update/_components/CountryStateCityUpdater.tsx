import { CityList } from "@/core/data/CityList";
import { CountryList } from "@/core/data/CountryList";
import { StateList } from "@/core/data/StateList";
import {
  getCityFullNameForProfile,
  getStateKoreanName,
} from "@/core/utils/handleCountryStateCityModify";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

interface CountryStateCityUpdaterProps {
  profile: any;
  setValue: UseFormSetValue<any>;
}

/**
 * @Description Country, State, City를 업데이트하는 Component
 * @author 김영서
 **/
const CountryStateCityUpdater: React.FC<CountryStateCityUpdaterProps> = ({
  profile,
  setValue,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>(
    profile.residenceCountryCode
  ); //Country의 초기값은 API Response의 residenceCountryCode
  const [selectedState, setSelectedState] = useState<string>(
    profile.residenceStateCode
  ); //State의 초기값은 API Response의 residenceStateCode
  const [selectedCity, setSelectedCity] = useState<string>(
    profile.residenceCityCode
  ); //City의 초기값은 API Response의 residenceCityCode
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false); //Country를 선택할 수 있는 Dropdown
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false); //State를 선택할 수 있는 Dropdown
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false); //City를 선택할 수 있는 Dropdown
  const [isStateButtonVisible, setIsStateButtonVisible] = useState(true); //State를 선택하는 Button의 보여짐 여부 상태
  const [isCityButtonVisible, setIsCityButtonVisible] = useState(true); //City를 선택하는 Button의 보여짐 여부 상태

  const countries = CountryList;

  //국가코드에 해당하는 State들 생성
  const filteredState = StateList.filter(
    (state) => state.countryCode === selectedCountry
  );

  //StateCode에 해당하는 City들 생성
  const filteredCity = CityList.filter(
    (city) => city.stateCode === selectedState
  );

  useEffect(() => {
    setValue("residenceCountryCode", selectedCountry);
    setValue("residenceStateCode", selectedState);
    setValue("residenceCityCode", selectedCity);

    if (filteredState.length === 0) {
      //Country의 filteredState가 없으면 State버튼과 City버튼 안보여지게끔
      setIsStateButtonVisible(false);
      setIsCityButtonVisible(false);
    } else if (filteredState.length !== 0) {
      setIsStateButtonVisible(true);
      setIsCityButtonVisible(true);
      if (filteredCity.length === 0) {
        //State의 filteredCity가 없으면 City버튼 안보이게끔
        setIsCityButtonVisible(false);
      } else if (filteredCity.length !== 0) {
        if (selectedState.includes("All")) {
          //State가 전체일 경우에는 City버튼 안보이게끔
          setIsCityButtonVisible(false);
        } else {
          setIsCityButtonVisible(true);
        }
      }
    }
  }, [
    selectedCity,
    selectedCountry,
    selectedState,
    filteredCity,
    filteredState,
    setValue,
  ]);

  const toggleCountryDropdown = () => {
    setIsCountryDropdownOpen((prev) => !prev);
  };

  const toggleStateDropdown = () => {
    setIsStateDropdownOpen((prev) => !prev);
    setIsCityDropdownOpen(false);
  };

  const toggleCityDropdown = () => {
    setIsCityDropdownOpen((prev) => !prev);
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
    setSelectedState(""); //국가를 새로 선택했으므로, State와 City는 빈 값 할당
    setSelectedCity("");
  };

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    setSelectedCity(""); //State를 새로 선택했을 때 City는 빈 값 할당
    setIsStateDropdownOpen(false);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsCityDropdownOpen(false);
  };

  return (
    <div>
      <div className="block">
        {/* Country */}
        <span className="text-gray-700">Residence Country Code</span>
        <input
          type="button"
          name="residenceCountryCode"
          value={
            selectedCountry
              ? countries.find((country) => country.code === selectedCountry)
                  ?.name || "국가를 선택해주세요"
              : "국가를 선택해주세요"
          }
          onClick={toggleCountryDropdown}
          className="block text-left w-48 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
        />
        {isCountryDropdownOpen && (
          <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {countries.map(({ code, name, emoji }) => (
              <button
                key={code}
                onClick={() => handleCountrySelect(code)}
                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition-colors duration-150"
              >
                {emoji} {name}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* State */}
      {isStateButtonVisible && (
        <div className="block">
          <span className="text-gray-700">Residence State Code</span>
          <input
            type="button"
            name="residenceStateCode"
            value={
              selectedState
                ? getStateKoreanName(selectedState)
                : "구/도를 선택해주세요"
            }
            onClick={toggleStateDropdown}
            className="block w-full text-left mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {isStateDropdownOpen && (
            <div className="relative z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
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
      {/* City */}
      {isCityButtonVisible && (
        <div className="block">
          <span className="text-gray-700">Residence City Code</span>
          <input
            type="text"
            name="residenceCityCode"
            onClick={toggleCityDropdown}
            value={
              selectedCity
                ? getCityFullNameForProfile(selectedCity)
                : "시를 선택해주세요"
            }
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {isCityDropdownOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredCity.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleCitySelect(city.cityCode)}
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

export default CountryStateCityUpdater;
