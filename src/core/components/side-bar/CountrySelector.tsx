"use client";

import { CountryList } from "@/core/data/CountryList";
import { countryStore } from "@/core/store/country-store";
import { getCountryCode } from "@/core/utils/handleCountryStateCityModify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchIcon from "../icons/top-bar/SearchIcon";
import { count } from "console";
import CloseIcon from "../icons/CloseIcon";

/**
 * @Description 현재 국가 선택 Dropdown
 * @author 김영서
 **/
const CountrySelector = () => {
  const { setCountry, countryName } = countryStore();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const countryOptions = CountryList;

  const filteredCountries = countryOptions.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toUpperCase().includes(searchQuery.toUpperCase())
  );

  // CountryList에 대한 객체
  const handleCountryDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 국가 선택 시 해당 국가 홈페이지로 redirect
  const handleCountrySelect = (country: string) => {
    const countryCode = getCountryCode(country);
    if (countryCode) {
      setCountry(countryCode);
    }
    setIsOpen(false);
    router.push(`/${countryCode}`);
  };

  return (
    <>
      <button
        className="inline-flex justify-between items-center w-full  text-sm font-medium text-black  focus:outline-none "
        onClick={handleCountryDropdown}
      >
        {countryName}
        <svg
          className={`w-5 h-5 ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* 국가 선택 Dropdown */}
      {isOpen && (
        <div className="absolute -left-2 mt-2 w-[400px] rounded-md h-[380px] bg-white focus:outline-none">
          <div className="relative z-10 w-full bg-white border h-[380px] border-gray-300 rounded-md overflow-y-auto">

            {/* 국가설정 HEADER */}
            <div className="w-full h-[30px] flex items-start justify-start pl-[15px] mt-[13px] shadow-sm font-bold">
              국가 설정
            </div>
            {/* 닫기 버튼 */}
            <button
              className="absolute top-[8px] right-[15px]"
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon />
            </button>

            {/* 검색기능 */}
            <div className="w-[340px] ml-[15px] mr-[15px] flex h-[40px] mt-[10px] bg-[#F6F6F6] relative border rounded-[5px]">
              <div className="absolute top-[20px] left-[5px]">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="국가 또는 지역 검색"
                className="w-full ml-[40px] bg-[#F6F6F6] pl-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
              />
            </div>

            <hr className="w-[350px] h-[1px] my-[10px] mx-auto flex items-center justify-center" />

            {filteredCountries.map((country) => (
              <button
                key={country.code}
                onClick={() => handleCountrySelect(country.name)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition-colors duration-150 flex items-center gap-x-2"
              >
                <div className="flex">{country.icon}</div>
                <span className="flex items-start justify-start text-[14px]">
                  {country.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CountrySelector;
