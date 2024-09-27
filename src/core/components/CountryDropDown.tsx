"use client";

import {countryStore} from "@/core/store/country-store";

interface DropDownProps {
    list: string[];
}

export default function CountryDropDown({ list}: DropDownProps) {

    const {country, setCountry} = countryStore();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCountry(event.target.value);
    };

    return (
        <select
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={country}
            onChange={handleChange}
        >
            {list.map((item: string, index: number) => (
                <option key={index} value={item} className="text-gray-700">
                    {item}
                </option>
            ))}
        </select>
    );
}
