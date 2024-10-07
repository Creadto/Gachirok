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
    const countryOptions = Object.values(CountryList);
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
            <div className=" flex flex-col border-gray-400 border-2 rounded-md">
                <span className=" ml-1 text-xs text-gray-500">현재 국가</span>
                <div className=" ml-1 flex flex-row mb-3">
                    <img src="/images/no-profile.png" className="mt-1 w-8 h-8 my-auto" />

                    <div className="flex flex-row w-auto max-w-full ml-2">
                        <button
                            className="inline-flex justify-between items-center w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                    </div>
                </div>
            </div>
            {/* 국가 선택 Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {countryOptions.map((country) => (
                            <button
                                key={country}
                                onClick={() => handleCountrySelect(country)}
                                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition-colors duration-150"
                            >
                                {country}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default CountrySelector;