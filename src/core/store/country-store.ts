import {create} from 'zustand';
import { devtools } from 'zustand/middleware'

interface countryStore{
    country: string;
    setCountry: (country:string)=>void;
}

export const countryStore = create<countryStore>()(devtools((set)=>({
    country: "",
    setCountry: (country)=>set({country: country}),
    })));