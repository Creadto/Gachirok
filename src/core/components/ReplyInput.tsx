"use client";

import {useState} from "react";
import axios from "axios";

interface ReplyInputProps {
    type:string;
    parentId:string | number;
}

/**
 * @Description 댓글 입력 컴포넌트
 * @Author 민동현
 */
export default function ReplyInput({type,parentId}: ReplyInputProps) {

    const [replyContent, setReplyContent] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastContent, setToastContent] = useState("");
    // const newsId = params['news-id'];

    const onClick = async(e:React.MouseEvent<HTMLElement,MouseEvent>)=>{
        e.preventDefault();

        if(replyContent === ""){
            setShowToast(true);
            setToastContent("내용을 입력해주세요.")
            setTimeout(()=>{
                setShowToast(false);
            },3000)
            return;
        }
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}/${parentId}/reply`,{
                id: 31,
                content:"asdasdasdas",
                author:"mindong"
            });

            setShowToast(true);
            setToastContent("댓글이 입력되었습니다.")
            setReplyContent("");

            setTimeout(()=>{
                setShowToast(false);
            },3000)
        }
        catch (error) {
            console.log(error);
        }

    }
    return(
        <div className="mb-[20px]">
            <form className="flex flex-row items-center relative">
                <input
                    placeholder="댓글을 입력해주세요."
                    className="bg-[#f6f6f6] w-full h-[50px] rounded-[8px] text-[14px] border-solid border-[1px] border-[#eee] px-[11px] py-[15px]"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                />
                <div>
                    <button
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[58px] h-[28px] text-[12px] text-[#fff] rounded-[2px] bg-[#000] px-[6px] py-[8px] flex justify-center items-center"
                        onClick={onClick}
                    >
                        댓글입력
                    </button>
                </div>
                {showToast ?
                    <div className="flex flex-row item-center fixed bottom-[50px] right-[50px] w-[320px] h-[60px] px-[20px] py-[15px] border border-l-4 border-solid border-[#eee] border-l-[#e62a2f] rounded-[5px] bg-[#fff] animate-bounce">
                        <div className="flex items-center justify-center mr-[15px]">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#fgfdvtzs6a)">
                                    <path d="M9 18A9 9 0 1 0 9 0a9 9 0 0 0 0 18z" fill="#E62A2F"/>
                                    <path d="m5.672 8.708 2.565 2.565L12.33 6.73" stroke="#fff" stroke-width="1.5"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                                <defs>
                                    <clipPath id="fgfdvtzs6a">
                                        <path fill="#fff" d="M0 0h18v18H0z"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <hr className="w-[1px] h-[30px] bg-[#eee]"/>
                        <div className="flex items-center justify-center ml-[15px] text-[15px]">
                            {toastContent}
                        </div>
                    </div> : null
                }
            </form>
        </div>
    );
}