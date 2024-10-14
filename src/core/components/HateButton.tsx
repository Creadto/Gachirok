"use client"

import {useState} from "react";

export default function HateButton({disLikeCount}:{disLikeCount:number}){

    const [disLike,setDisLike]=useState(disLikeCount);

    const onClick = () => {
        setDisLike(disLikeCount => disLikeCount + 1);
    }

    return(
        <div
            className="px-4 border rounded-2xl flex flex-col items-center hover:bg-red-100 transition"
            onClick={onClick}>
            <button
                className="p-3 rounded-full px-4 py-2"
            >
                👎
            </button>
            <p className="text-sm font-bold text-red-400">그냥 그래요.</p>
            <p className="font-bold">{disLike}</p>
        </div>
    );
}