"use client";

import { CountryList } from "@/core/data/CountryList";
import { countryStore } from "@/core/store/country-store";
import { getCountryCode } from "@/core/utils/handleCountryStateCityModify";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * @Description 현재 국가 선택 Dropdown
 * @author 김영서
 **/
const CountrySelector = () => {
  const { setCountry, countryName } = countryStore();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // CountryList에 대한 객체
  const countryOptions = CountryList;
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
        <div className="absolute left-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {countryOptions.map((country) => (
              <button
                key={country.code}
                onClick={() => handleCountrySelect(country.name)}
                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition-colors duration-150"
              >
                {country.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CountrySelector;
