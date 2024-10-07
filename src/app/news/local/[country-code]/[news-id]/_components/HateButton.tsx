"use client"

import {useState} from "react";

export default function HateButton({disLikeCount}:{disLikeCount:number}){

    const [disLike,setDisLike]=useState(disLikeCount);

    const onClick = () => {
        setDisLike(disLikeCount => disLikeCount + 1);
    }

    return(
        <div className="px-6">
            <button
                className="p-3 rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={onClick}
            >
                👎
            </button>
            <p className="font-bold">비추천 {disLike}</p>
        </div>
    );
}