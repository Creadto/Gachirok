"use client";

import {countryStore} from "@/core/store/country-store";

export default function Country(){

    const {country} = countryStore();

    return(
      <div>
          {country}
      </div>
    );
}