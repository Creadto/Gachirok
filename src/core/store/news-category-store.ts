import {create} from "zustand";
import {devtools} from "zustand/middleware";


interface newsCategoryStore{
    category: string;
    setCategory: (newCategory: string)=> void;
}

export const newsCategoryStore= create<newsCategoryStore>()(devtools((set)=>({
    category: "",
    setCategory: (category) => set({category}),
})));