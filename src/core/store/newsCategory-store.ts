import { create } from 'zustand';
import {CountryList} from "@/core/data/CountryList";

interface categoryStore{
    category: {
        universal?: boolean[];
        local?: Record<string,boolean[]>;
    };
    setUniversalCategory: (category: {universal:boolean[]})=>void;
    setLocalCategory: (category:{local: Record<string,boolean[]>})=>void;
}

/**
 * @Description
 * @author 민동현
 **/
export const newsCategoryStore = create<categoryStore>((set)=>({
    category: {
        universal: [true, true, true, true, true, true], // 정치, 경제, 사회, 스포츠, 문화, 생활
        local: CountryList.reduce((acc,country)=>{
            acc[country.code] = [true,true,true,true,true,true];
            return acc;
        }, {} as Record<string,boolean[]>),
    },

    setUniversalCategory: (category)=>set((state)=>({
        category:{
            ...state.category,
            universal: category.universal
        }
    })),

    setLocalCategory: (category)=>set((state)=>({
        category:{
            ...state.category,
            local:{
                ...state.category.local,
                ...category.local
            },
        }
    }))

}));